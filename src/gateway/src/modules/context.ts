import { getClientIp } from 'request-ip';
import { Request } from 'express';

export const context = async (session) => {
  const req: Request = session.req;
  if (!session.req) {
    return {
      ip: '',
      userAgent: '',
    };
  }

  let authToken = (req.headers.authorization || req.headers.Authorization) as string;
  authToken = authToken && authToken.replace('Bearer ', '');

  let currentUser = {
    id: "1",
    username: authToken
  }

  const userAgent = (req.headers['user-agent'] as string) || '';
  const ip = getClientIp(req);

  return {
    userAgent,
    ip,
    currentUser,
    userId: currentUser && currentUser.id
  };
};