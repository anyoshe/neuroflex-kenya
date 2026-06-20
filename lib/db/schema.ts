import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  reportNo: text("report_no"),
  patientName: text("patient_name").notNull(),
  age: integer("age"),
  sex: text("sex"),
  residence: text("residence"),
  tel: text("tel"),
  reportingDate: text("reporting_date"),
  nextOfKin: text("next_of_kin"),
  presentingHistory: text("presenting_history"),
  assessmentFindings: text("assessment_findings"),
  intervention: text("intervention"),
  review: text("review"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
});
