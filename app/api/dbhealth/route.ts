import { NextResponse } from "next/server";
import { Client } from "pg";

export const runtime = "nodejs";

const responseOptions = { headers: { "Cache-Control": "no-store" } };

export async function GET() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json({ status: "unavailable" }, { ...responseOptions, status: 503 });
  }

  let client: Client | undefined;
  try {
    client = new Client({
      connectionString,
      connectionTimeoutMillis: 3000,
      query_timeout: 3000,
    });
    await client.connect();
    await client.query("SELECT 1");
    return NextResponse.json({ status: "ok" }, responseOptions);
  } catch {
    return NextResponse.json({ status: "unavailable" }, { ...responseOptions, status: 503 });
  } finally {
    await client?.end();
  }
}
