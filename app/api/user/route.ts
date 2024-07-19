import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from "next/headers";

/** @param {NextRequest} req */
export async function GET(req) {
  const { ua } = userAgent(req);

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  const data = {
    ok: true,
    ip_address: ip,
    user_agent: ua,
  };

  return NextResponse.json(data, { status: 200 });
}