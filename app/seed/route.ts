import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      telegram_id BIGINT NOT NULL UNIQUE,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255),
      username VARCHAR(255),
      language_code VARCHAR(10),
      is_premium BOOLEAN,
      is_bot BOOLEAN,
      allows_write_to_pm BOOLEAN,
      added_to_attachment_menu BOOLEAN,
      photo_url TEXT
    );
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers()
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ error }, { status: 500 });
  }
}
