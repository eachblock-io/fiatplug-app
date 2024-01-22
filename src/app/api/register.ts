import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register_super_admin`,
      req.body
    );

    if (!data) {
      res.status(401).json({ error: `Invalid credentials` });
      return;
    }

    const token = data?.data?.attributes?.access_token;

    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`token`, token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
        maxAge: 60 * 60 * 24 * 1, // 1 day
        sameSite: `strict`,
        path: `/`,
      })
    );

    res.status(200).json(data);
  } catch (error) {
    return error;
  }
};

export default handler;
