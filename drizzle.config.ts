import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/productSchema.ts', './src/db/usersSchema.ts', './src/db/usersSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    },
    verbose: true,
  strict: true,
});