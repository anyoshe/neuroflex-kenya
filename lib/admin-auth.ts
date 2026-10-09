import { createHmac, timingSafeEqual } from "crypto";

function getJwtSecret() {
  return process.env.JWT_SECRET || "neuroflex-admin-dev-secret-2026";
}

export function verifyAdminToken(token: string) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) return false;

  const expectedSignature = createHmac("sha256", getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const supplied = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
    return (
      typeof payload.exp === "number" &&
      payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
