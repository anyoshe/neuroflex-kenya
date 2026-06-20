CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" text NOT NULL,
	"age" integer,
	"sex" text,
	"residence" text,
	"reporting_date" text,
	"next_of_kin" text,
	"presenting_history" text,
	"assessment_findings" text,
	"intervention" text,
	"review" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
