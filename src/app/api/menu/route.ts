import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const url = process.env.MENU_PDF_URL;
  if (!url) {
    return new NextResponse("Menu non disponibile", { status: 404 });
  }
  // Se è un path relativo (es. /menu.pdf) lo trasformiamo in URL assoluto
  const target = url.startsWith("http") ? url : new URL(url, req.nextUrl.origin).toString();
  return NextResponse.redirect(target, { status: 302 });
}
