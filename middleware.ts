import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

// This middleware will redirect the user to the default locale if the locale is not set

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';

    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}/${req.nextUrl.search}`,
        req.url
      )
    );
  }
}
