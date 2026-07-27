import { NextRequest, NextResponse } from "next/server";

// InsForge's storage backend serves every object with
// Content-Type: binary/octet-stream regardless of the file's real MIME
// type, which forces a browser download instead of opening the PDF inline.
// This route re-fetches the object server-side and re-serves it with the
// correct headers so the "LEGAL" links in the footer open in a new tab
// instead of downloading.
const ALLOWED_HOST = new URL(process.env.INSFORGE_URL!).host;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") || "documento.pdf";
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  if (parsed.host !== ALLOWED_HOST) {
    return NextResponse.json({ error: "Url not allowed" }, { status: 400 });
  }

  const upstream = await fetch(parsed.toString());
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Could not fetch document" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename.replace(/["\\]/g, "")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
