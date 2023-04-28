import { ReactNode, useReducer } from 'react'
import { UserActions, UserContext, UserState } from './UserContext'
import { UserActionsKind, userReducer } from './userReducer'
import { SortBy } from '../interfaces/Users'

const INITIAL_STATE: UserState = {
  users: [],
  showColors: false,
  error: null,
  filterCountry: null,
  sorting: SortBy.NONE,
}

interface Props {
  children: ReactNode | ReactNode[]
}

export function UsersProvider({ children }: Props) {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const setUsers: UserActions['setUsers'] = payload =>
    dispatch({ type: UserActionsKind.SET_USERS, payload })

  const setShowColors: UserActions['setShowColors'] = payload =>
    dispatch({ type: UserActionsKind.SET_SHOW_COLORS, payload })

  const setError: UserActions['setError'] = payload =>
    dispatch({ type: UserActionsKind.SET_ERROR, payload })

  const setFilterCountry: UserActions['setFilterCountry'] = payload =>
    dispatch({ type: UserActionsKind.SET_FILTER_COUNTRY, payload })

  const setSorting: UserActions['setSorting'] = payload =>
    dispatch({ type: UserActionsKind.SET_SORTING, payload })

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          setUsers,
          setShowColors,
          setError,
          setFilterCountry,
          setSorting,
        },
      }}>
      {children}
    </UserContext.Provider>
  )
}
