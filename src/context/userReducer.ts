import { User } from '../interfaces/Users'
import { UserState } from './UserContext'

export enum UserActionsKind {
  SET_USERS,
  SET_SHOW_COLORS,
  SET_SORT_BY_COUNTRY,
  SET_ERROR,
  SET_FILTER_COUNTRY,
}

type SetUsersAction = {
  type: UserActionsKind.SET_USERS
  payload: User[]
}

type SetShowColorsAction = {
  type: UserActionsKind.SET_SHOW_COLORS
  payload: boolean
}

type SetSortByCountryAction = {
  type: UserActionsKind.SET_SORT_BY_COUNTRY
  payload: boolean
}

type SetErrorAction = {
  type: UserActionsKind.SET_ERROR
  payload: string | null
}

type SetFilterCountryAction = {
  type: UserActionsKind.SET_FILTER_COUNTRY
  payload: string | null
}

export type UserActionReducer =
  | SetUsersAction
  | SetShowColorsAction
  | SetSortByCountryAction
  | SetErrorAction
  | SetFilterCountryAction

export const userReducer = (state: UserState, action: UserActionReducer) => {
  switch (action.type) {
    case UserActionsKind.SET_USERS:
      return { ...state, users: action.payload }

    case UserActionsKind.SET_SHOW_COLORS:
      return { ...state, showColors: action.payload }

    case UserActionsKind.SET_SORT_BY_COUNTRY:
      return { ...state, sortByCountry: action.payload }

    case UserActionsKind.SET_ERROR:
      return { ...state, error: action.payload }

    case UserActionsKind.SET_FILTER_COUNTRY:
      return { ...state, filterCountry: action.payload }

    default:
      return state
  }
}
