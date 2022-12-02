import { create, verify } from 'djwt';
import { RouterContext } from 'oak';
import { verify as hashVerify } from 'scrypt';

const SECRET_KEY = Deno.env.get('SECRET_KEY');
const ALGORITHM = 'HS512';

export const authenticate = async (user: any, password: string) => {
  if (await verifyPassword(password, user.password)) {
    return createToken(user);
  }
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValidPassword = await hashVerify(password, hashedPassword as string);
  return isValidPassword;
};

const createToken = async (user: any) => {
  if (!SECRET_KEY)
    throw new Error('SECRET_KEY not set as environment variable');
  const jwt = await create(
    { alg: ALGORITHM, typ: 'JWT' },
    { userId: user.userId },
    SECRET_KEY
  );
  return jwt;
};

export const setContextUser = async (ctx: RouterContext) => {
  const token = await parseToken(ctx);
  if (!token) return null;
  const user = await verifyToken(token);
  return user;
};

const parseToken = async (ctx: RouterContext) => {
  const authorizationHeader = await ctx.request.headers.get('authorization');
  const parts = authorizationHeader ? authorizationHeader.split(' ') : [];
  const token =
    parts.length === 2 && parts[0].toLowerCase() === 'bearer'
      ? parts[1]
      : undefined;
  return token;
};

const verifyToken = async (token: string | undefined) => {
  if (token) {
    if (!SECRET_KEY)
      throw new Error('SECRET_KEY not set as environment variable');
    const payload = await verify(token, SECRET_KEY, ALGORITHM);
    return payload;
  }
  return;
};
