export async function GET() {
  return Response.json({
    node: process.version,
    env: process.env.VERCEL ? "vercel" : "local",
  });
}