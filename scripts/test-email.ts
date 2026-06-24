import { config } from "dotenv";
import { resolve } from "path";
import { verifyMailConnection } from "../lib/email";

config({ path: resolve(process.cwd(), ".env.local") });

verifyMailConnection()
  .then(() => {
    console.log("✅ Gmail SMTP connection verified successfully.");
    console.log("You can now submit the booking form on the website.");
  })
  .catch((error) => {
    console.error("❌ Gmail SMTP verification failed.");
    console.error(error instanceof Error ? error.message : error);
    console.error("\nChecklist:");
    console.error("- App password was created while signed in to neuroflexkenya@gmail.com");
    console.error("- 2-Step Verification is enabled on that account");
    console.error("- EMAIL_USER and EMAIL_PASSWORD are set in .env.local at the project root");
    console.error("- Restart `npm run dev` after changing .env.local");
    process.exit(1);
  });
