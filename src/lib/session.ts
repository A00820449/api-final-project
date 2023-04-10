import type { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session-cookie',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}


export const withSessionApiRoute = (handler: NextApiHandler) => {
    return withIronSessionApiRoute(handler, sessionOptions)
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user_id: string
  }
}