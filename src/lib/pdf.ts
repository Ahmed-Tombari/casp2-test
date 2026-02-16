import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'

export async function watermarkPdf(pdfBuffer: ArrayBuffer, userInfo: { name: string, email: string }) {
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pages = pdfDoc.getPages()
  
  const watermarkText = `${userInfo.name} (${userInfo.email}) - ${new Date().toLocaleString()}`
  
  for (const page of pages) {
    const { width, height } = page.getSize()
    
    // Diagonal watermark
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        page.drawText(watermarkText, {
          x: (width / 5) * i + 50,
          y: (height / 5) * j + 50,
          size: 14,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.15,
          rotate: degrees(45),
        })
      }
    }
  }
  
  return await pdfDoc.save()
}
