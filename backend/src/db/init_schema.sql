generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // .env file mein Postgres URL check kar lena
}

model User {
  id            Int      @id @default(autoincrement())
  name          String
  email         String   @unique
  password_hash String
  role          String
  is_active     Boolean  @default(true)
}

model Product {
  id            Int      @id @default(autoincrement())
  sku           String   @unique
  name          String
  unit_cost     Float
  inventories   InventoryBalance[]
  ledgers       StockLedger[]
}

model Location {
  id            Int      @id @default(autoincrement())
  name          String
  short_code    String
  inventories   InventoryBalance[]
  ledgers       StockLedger[]
}

model InventoryBalance {
  id          Int      @id @default(autoincrement())
  product     Product  @relation(fields: [productId], references: [id])
  productId   Int
  location    Location @relation(fields: [locationId], references: [id])
  locationId  Int
  on_hand     Float    @default(0)
  reserved    Float    @default(0)

  // Prevents duplicate rows for same product in same location
  @@unique([productId, locationId])
}

model StockLedger {
  id              Int      @id @default(autoincrement())
  product         Product  @relation(fields: [productId], references: [id])
  productId       Int
  location        Location @relation(fields: [locationId], references: [id])
  locationId      Int
  movement_type   String   // RECEIPT, DELIVERY, TRANSFER, ADJUSTMENT
  quantity_delta  Float
  balance_before  Float
  balance_after   Float
  reference_type  String?
  reference_id    Int?
  created_at      DateTime @default(now())
}