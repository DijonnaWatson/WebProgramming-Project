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
}

export interface User {
  email: string
  firstName: string
  lastName: string
  profilePic: string
  adminAccess: boolean
  activityLogs: ActivityLog[]
}