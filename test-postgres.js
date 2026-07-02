require("dotenv").config({ path: ".env.local" });

const postgres = require("postgres");

(async () => {
  const sql = postgres(process.env.DATABASE_URL);

  try {
    const result = await sql`SELECT NOW()`;
    console.log(result);

    await sql.end();
  } catch (err) {
    console.error(err);
  }
})();