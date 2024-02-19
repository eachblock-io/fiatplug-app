import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { serialize } from "cookie";

export async function DELETE() {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/access_token`);

  const serialized = serialize(`token`, ``, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
    expires: new Date(0), // 1 day
    sameSite: `strict`,
    path: `/`,
  });

  const response = {
    message: "Successfully!!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-cookie": serialized },
  });
}
