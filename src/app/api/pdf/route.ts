import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { watermarkPdf } from "@/lib/pdf";
import { verifyPdfAccessToken } from "@/lib/token";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let blobUrl = searchParams.get("url");
  const accessCode = searchParams.get("code");
  const fileId = searchParams.get("file");

  // Map fileId to blob URL if provided
  if (!blobUrl && fileId) {
    if (fileId.startsWith('mufid-')) {
      const key = fileId.replace('mufid-', '');
      blobUrl = `https://3nvnebfanoina0ww.public.blob.vercel-storage.com/store-book/mufid-book/mufid-${key}/${key}-1.pdf`;
    }
  }

  if (!blobUrl) return new NextResponse("Missing URL", { status: 400 });

  // Safety check: only allow proxying from the authorized Vercel Blob domain
  if (!blobUrl.includes('3nvnebfanoina0ww.public.blob.vercel-storage.com')) {
    return new NextResponse("Forbidden source domain", { status: 403 });
  }

  let user = null;
  const standardSession = await getSession();

  if (standardSession) {
    user = standardSession.user;
  } else {
    // Check for book_session cookie (used by code access flow)
    const cookieStore = await cookies();
    const bookSessionToken = cookieStore.get('book_session')?.value;

    if (bookSessionToken) {
      try {
        const payload = verifyPdfAccessToken(bookSessionToken);
        user = {
          name: "Guest User",
          email: payload.email || "guest@example.com",
        };
      } catch (err) {
        console.error("Book session verification failed:", err);
      }
    }

    // Fallback to direct access code check if provided in URL
    if (!user && accessCode) {
      const crypto = await import("crypto");
      const codeHash = crypto
        .createHash("sha256")
        .update(accessCode)
        .digest("hex");

      const code = await prisma.accessCode.findUnique({
        where: { codeHash },
        include: { user: true },
      });

      if (code && !code.used && new Date(code.expiresAt) > new Date()) {
        user = code.user
          ? {
              name: `${code.user.firstName} ${code.user.lastName}`,
              email: code.user.email,
            }
          : {
              name: "Access Code User",
              email: code.email || "guest@example.com",
            };
      }
    }
  }

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch file from Vercel Blob
  try {
    const response = await fetch(blobUrl);
    const pdfBuffer = await response.arrayBuffer();

    // Apply watermark if requested
    const shouldWatermark = searchParams.get("watermark") === "true";
    const finalBuffer = shouldWatermark 
      ? await watermarkPdf(pdfBuffer, user)
      : pdfBuffer;

    // Log access
    await prisma.accessLog.create({
      data: {
        userId: standardSession?.user?.id || null,
        ip: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return new NextResponse(Buffer.from(finalBuffer as Uint8Array), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("PDF Stream Error:", error);
    return new NextResponse("Error streaming PDF", { status: 500 });
  }
}
