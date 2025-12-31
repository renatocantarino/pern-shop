import { db } from './index'
import { eq } from 'drizzle-orm'
import {
  users,
  products,
  comments,
  type NewUser,
  type NewProduct,
  type NewComment,
} from './schema'

import { getUserById, getProductById, getCommentById } from './queries'

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning()
  return user
}

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id)
  if (!existingUser) {
    throw new Error(`User with id ${id} not found`)
  }

  const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning()
  return user
}

export const upsertUser = async (data: NewUser) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning()
  return user
}

// PRODUCT COMMANDS
export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning()
  return product
}

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const existingProduct = await getProductById(id)
  if (!existingProduct) {
    throw new Error(`Product with id ${id} not found`)
  }

  const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning()
  return product
}

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id)
  if (!existingProduct) {
    throw new Error(`Product with id ${id} not found`)
  }

  const [product] = await db.delete(products).where(eq(products.id, id)).returning()
  return product
}

// COMMENT COMMANDS
export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning()
  return comment
}

export const deleteComment = async (id: string) => {
  const existingComment = await getCommentById(id)
  if (!existingComment) {
    throw new Error(`Comment with id ${id} not found`)
  }

  const [comment] = await db.delete(comments).where(eq(comments.id, id)).returning()
  return comment
}
