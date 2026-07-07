import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
    try {

        const services = await query(
            `
            SELECT
                id,
                service_name,
                category
            FROM service_catalog
            WHERE active = true
            ORDER BY service_name
            `
        );
        return NextResponse.json(services);

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { error: "Unable to load services" },
            { status: 500 }
        );

    }
}