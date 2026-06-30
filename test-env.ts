console.log("DATABASE_URL:", process.env.DATABASE_URL ? "PRESENT" : "MISSING");
console.log(process.env.DATABASE_URL?.substring(0, 60) + "...");