import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// import { jwt } from '../../utils';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
    // const { token = '' } = req.cookies;

    // try {
    //     await jwt.isValidToken(token);
    //     return NextResponse.next();
    // } catch (error) {
    //     return NextResponse.redirect(`/auth/login?p=${req.page.name}`)
    // }

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
    }

    return NextResponse.next();
}