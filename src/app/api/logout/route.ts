import cookie from "cookie";

const logout = async (req: any, res: any) => {
  try {
    if (req.method === `POST`) {
      // DESTROY COOKIE
      res.setHeader(
        `Set-Cookie`,
        cookie.serialize(`token`, ``, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
          expires: new Date(0),
          sameSite: `strict`,
          path: `/`,
        })
      );

      res.status(200).json({ message: `Success` });
    } else {
      res.setHeader(`Allow`, [`POST`]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.log(error);
  }
};

export default logout;
