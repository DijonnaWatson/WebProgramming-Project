// src/models/users.ts
// import data from '../data/users.json'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}

export async function getById(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
}

export function create(user: User) {
  return api<DataEnvelope<User>>('users', user)
}

export function update(user: User) {
  return api<DataEnvelope<User>>(`users/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}
export interface ActivityLog {
  date: string
  activity: string
  duration: number
  calories: number
  distance: number
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  profilePic: string
  adminAccess: boolean
  activityLogs: ActivityLog[]
}

//Old button functions 
// // Add, edit, and delete methods
// export const addUser = (user: User) => {
//   data.items.push(user)
//   data.total += 1
// }

// export const editUser = (email: string, updatedUser: Partial<User>) => {
//   const userIndex = data.items.findIndex((user: User) => user.email === email)
//   if (userIndex !== -1) {
//     data.items[userIndex] = { ...data.items[userIndex], ...updatedUser }
//   }
// }

// export const deleteUser = (email: string) => {
//   data.items = data.items.filter((user: User) => user.email !== email)
//   data.total -= 1
// }
