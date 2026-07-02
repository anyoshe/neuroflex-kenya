require("dotenv").config({ path: ".env.local" });

const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const { Client } = require("pg");

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 60000,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  try {
    console.log(await dns.promises.lookup(
      "ep-wandering-band-ai69r3wn-pooler.c-4.us-east-1.aws.neon.tech",
      { all: true }
    ));

    await client.connect();

    console.log("CONNECTED");

    const r = await client.query("SELECT NOW()");
    console.log(r.rows);

    await client.end();
  } catch (e) {
    console.error(e);
  }
})();