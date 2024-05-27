import moment, { Moment } from "moment";
import jwt from "jsonwebtoken";
import { promises } from "dns";

export interface TokenResponse {
  token: string;
  exp: Date;
}

interface User {
  id: number;
  name: string|null;
  email: string;
}

const salt = "1234abcd";

const generateToken = (user: User, exp: Moment, secret = salt): string => {
  const payload = {
    user: user,
    iat: moment().unix(),
    exp: exp.unix(),
  };
  return jwt.sign(payload, secret);
}

export const generateAuthTokens = async (
  user: User
): Promise<TokenResponse> => {
  const accessTokenExpires = moment().add(7200, "minutes");
  const accessToken = generateToken(user, accessTokenExpires, salt);
  return {
    token: accessToken,
    exp: accessTokenExpires.toDate(),
  };
};