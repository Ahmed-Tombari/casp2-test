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

  const r2BaseUrl =
    process.env.NEXT_PUBLIC_R2_BASE_URL ||
    "https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev";

  // Map fileId to blob URL if provided
  if (!blobUrl && fileId) {
    if (fileId.startsWith("mufid-")) {
      const key = fileId.replace("mufid-", "");
      blobUrl = `${r2BaseUrl}/store-book/mufid-book/mufid-${key}/mufid-${key}.pdf`;
    }
  }

  if (!blobUrl) return new NextResponse("Missing URL", { status: 400 });

  // Safety check: only allow proxying from the authorized R2 domain or local API routes
  const r2Domain = new URL(r2BaseUrl).hostname;
  const isLocalApi = blobUrl.startsWith("/api/");
  if (!blobUrl.includes(r2Domain) && !isLocalApi) {
    return new NextResponse("Forbidden source domain", { status: 403 });
  }

  // Determine the fetch URL (absolute URL required for local API routes)
  let fetchUrl = blobUrl;
  if (isLocalApi) {
    const baseUrl = new URL(request.url).origin;
    fetchUrl = `${baseUrl}${blobUrl}`;
  }

  // Determine if it's a public resource (e.g., teacher guides in dalil-book or store samples)
  const isPublicResource = blobUrl.includes("/dalil-book/") || blobUrl.includes("/store-book/");

  let user = null;
  const standardSession = await getSession();

  if (standardSession) {
    user = standardSession.user;
  } else if (!isPublicResource) {
    // Only check for other auth methods if it's NOT a public resource
    // Check for book_session cookie (used by code access flow)
    const cookieStore = await cookies();
    const bookSessionToken = cookieStore.get("book_session")?.value;

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

  // Final auth check: either authenticated user or public resource
  if (!user && !isPublicResource) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch file from R2 or Local API
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch PDF: ${response.status} ${response.statusText}`,
      );
      return new NextResponse(`Error fetching resource: ${response.status}`, {
        status: response.status,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Apply watermark if requested
    const shouldWatermark = searchParams.get("watermark") === "true";
    const finalBuffer = shouldWatermark
      ? await watermarkPdf(pdfBuffer)
      : pdfBuffer;

    // Log access if user is present
    if (user || standardSession?.user) {
      try {
        await prisma.accessLog.create({
          data: {
            userId: standardSession?.user?.id || null,
            ip: request.headers.get("x-forwarded-for") || "unknown",
          },
        });
      } catch (logError) {
        console.error("Failed to log access:", logError);
      }
    }

    return new NextResponse(Buffer.from(finalBuffer as Uint8Array), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("PDF Stream Error:", error);
    return new NextResponse("Error streaming PDF", { status: 500 });
  }
}
