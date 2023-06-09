import { SortBy, User } from '../interfaces/Users'
import { UserState } from './UserContext'

export enum UserActionsKind {
  SET_USERS,
  SET_SHOW_COLORS,
  SET_ERROR,
  SET_FILTER_COUNTRY,
  SET_CURRENT_PAGE,
  SET_SORTING,
  SET_LOADING,
}

type SetUsersAction = {
  type: UserActionsKind.SET_USERS
  payload: User[]
}

type SetShowColorsAction = {
  type: UserActionsKind.SET_SHOW_COLORS
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

type SetSortingAction = {
  type: UserActionsKind.SET_SORTING
  payload: SortBy
}

type SetLoading = {
  type: UserActionsKind.SET_LOADING
  payload: boolean
}

type SetCurrentPage = {
  type: UserActionsKind.SET_CURRENT_PAGE
  payload: number
}

export type UserActionReducer =
  | SetUsersAction
  | SetShowColorsAction
  | SetErrorAction
  | SetFilterCountryAction
  | SetSortingAction
  | SetLoading
  | SetCurrentPage

export const userReducer = (state: UserState, action: UserActionReducer) => {
  switch (action.type) {
    case UserActionsKind.SET_USERS:
      return { ...state, users: action.payload }

    case UserActionsKind.SET_SHOW_COLORS:
      return { ...state, showColors: action.payload }

    case UserActionsKind.SET_ERROR:
      return { ...state, error: action.payload }

    case UserActionsKind.SET_FILTER_COUNTRY:
      return { ...state, filterCountry: action.payload }

    case UserActionsKind.SET_SORTING:
      return { ...state, sorting: action.payload }

    case UserActionsKind.SET_LOADING:
      return { ...state, loading: action.payload }

    case UserActionsKind.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    default:
      return state
  }
}
