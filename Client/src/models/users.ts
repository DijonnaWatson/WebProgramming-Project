// src/models/users.ts
import data from '../data/users.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAllUsers(): DataListEnvelope<User> {
  return {
    data: data.items,
    total: data.total
  }
}

export interface User {
  email: string
  firstName: string
  lastName: string
  profilePic: string
}
