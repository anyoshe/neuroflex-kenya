require('dotenv').config({ path: '.env.local' });
console.log("DATABASE_URL present?", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  console.log("Value starts with:", process.env.DATABASE_URL.substring(0, 80) + "...");
} else {
  console.log("MISSING");
}
