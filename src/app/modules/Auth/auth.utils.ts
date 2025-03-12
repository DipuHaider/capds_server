import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: number | StringValue,
) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(jwtPayload, secret, options);
};

// import jwt from 'jsonwebtoken';

// export const createToken = (
//   jwtPayload: { userId: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };
