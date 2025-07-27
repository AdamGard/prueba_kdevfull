import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-jwt-secret-key-here');

export interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      sub: payload.sub as string,
      role: payload.role as string,
      exp: payload.exp as number,
      iat: payload.iat as number
    };
  } catch (error) {
    return null;
  }
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
}

export async function validateAuthToken(): Promise<TokenPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  
  return await verifyToken(token);
}
