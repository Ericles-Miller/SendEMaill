import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});


export const post = pgTable('post', {
  id: serial('id'),
  name: text('name'),
  description: text('description'),
  createdAt: timestamp('createdAt'),
  updateAt: timestamp('updatedAt'),
});