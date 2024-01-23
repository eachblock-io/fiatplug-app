import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    body
  );
  console.log(body)
  const token = data?.data?.attributes?.access_token;

  const serialized = serialize(`token`, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
    maxAge: 60 * 60 * 24 * 1, // 1 day
    sameSite: `strict`,
    path: `/`,
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-cookie": serialized },
  });
}
