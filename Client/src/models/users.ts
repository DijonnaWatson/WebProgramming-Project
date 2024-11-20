// src/models/users.ts
import data from '../data/users.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAllUsers(): DataListEnvelope<User> {
  return {
    data: data.items.map((user: any) => ({
      ...user,
      activityLogs: user.activityLogs || [] // Ensure activityLogs is included
    })),
    total: data.total
  }
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

// Add, edit, and delete methods
export const addUser = (user: User) => {
  data.items.push(user)
  data.total += 1
}

export const editUser = (email: string, updatedUser: Partial<User>) => {
  const userIndex = data.items.findIndex((user: User) => user.email === email)
  if (userIndex !== -1) {
    data.items[userIndex] = { ...data.items[userIndex], ...updatedUser }
  }
}

export const deleteUser = (email: string) => {
  data.items = data.items.filter((user: User) => user.email !== email)
  data.total -= 1
}
