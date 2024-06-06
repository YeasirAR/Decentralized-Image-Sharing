import { IronSessionOptions, withIronSessionApiRoute } from 'iron-session';

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSession(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}