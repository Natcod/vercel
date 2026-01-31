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
      is_premium BOOLEAN DEFAULT FALSE,
      is_bot BOOLEAN DEFAULT FALSE,
      allows_write_to_pm BOOLEAN DEFAULT FALSE,
      added_to_attachment_menu BOOLEAN DEFAULT FALSE,
      photo_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedOrders() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Create enum type
  await sql`DO $$ BEGIN CREATE TYPE order_type_enum AS ENUM ('buy', 'sell'); EXCEPTION WHEN duplicate_object THEN END $$`;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      asset_symbol VARCHAR(20),
      exchange VARCHAR(50),
      order_type order_type_enum NOT NULL,
      quantity INTEGER NOT NULL,
      price NUMERIC(15, 2) NOT NULL,
      status VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedWallets() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS wallets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      balance NUMERIC(15, 2) DEFAULT 0.00,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedPortfolios() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolios (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      asset_symbol VARCHAR(20) NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, asset_symbol)
    );
  `;
}

async function seedAssets() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS assets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      alpaca_id VARCHAR(255) UNIQUE NOT NULL,
      class VARCHAR(255) NOT NULL,
      exchange VARCHAR(255),
      symbol VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      status VARCHAR(255),
      tradable BOOLEAN,
      marginable BOOLEAN,
      maintenance_margin_requirement INTEGER,
      maintenance_margin_requirement_long INTEGER,
      maintenance_margin_requirement_short INTEGER,
      shortable BOOLEAN,
      easy_to_borrow BOOLEAN,
      fractionable BOOLEAN,
      attributes TEXT[]
    );
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedOrders(),
      seedWallets(),
      seedPortfolios(),
      seedAssets(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ error }, { status: 500 });
  }
}
