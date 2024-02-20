import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/access_token`, {
    headers,
  });

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
