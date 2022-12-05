/* eslint-disable no-bitwise */
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const JWT_SECRET = 'top-secret-key';
export const JWT_EXPIRES_IN = 3600 * 24 * 1; // 1 day

export const sign = (
  payload: Record<string, any>,
  privateKey: string,
  header: Record<string, any>
) => {
  const now = new Date();
  header.expiresIn = new Date(now.getTime() + header.expiresIn);
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(
    Array
      .from(encodedPayload)
      .map((item, key) => (
        String.fromCharCode(item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0))
      ))
      .join('')
  );

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const decode = (token: string): any => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('Expired token');
  }

  const verifiedSignature = btoa(
    Array
      .from(encodedPayload)
      .map((item, key) => (
        String.fromCharCode(item.charCodeAt(0) ^ JWT_SECRET[key % JWT_SECRET.length].charCodeAt(0))
      ))
      .join('')
  );

  if (verifiedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  return payload;
};

export const verify = (
  token: string,
  privateKey: string
): Record<string, any> => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('Expired token');
  }

  const verifiedSignature = btoa(
    Array
      .from(encodedPayload)
      .map((item, key) => (
        String.fromCharCode(item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0))
      ))
      .join('')
  );

  if (verifiedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  return payload;
};

export const isValidToken = (token: string) => {
  if (!token) return false;
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};
