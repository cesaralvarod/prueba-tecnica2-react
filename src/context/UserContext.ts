import { createContext } from 'react'
import { User } from '../interfaces/Users'

export type UserState = {
  users: User[]
  showColors: boolean
  sortByCountry: boolean
  error: string | null
  filterCountry: string | null
}
export type UserActions = {
  setUsers: (arg0: User[]) => void
  setShowColors: (arg0: boolean) => void
  setSortByCountry: (arg0: boolean) => void
  setError: (arg0: string | null) => void
  setFilterCountry: (arg0: string | null) => void
}

export interface UserContextValue {
  state: UserState
  actions: UserActions
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
)
