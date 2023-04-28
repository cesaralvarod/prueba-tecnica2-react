import { ReactNode, useReducer } from 'react'
import { UserActions, UserContext, UserState } from './UserContext'
import { UserActionsKind, userReducer } from './userReducer'

const INITIAL_STATE: UserState = {
  users: [],
  showColors: false,
  sortByCountry: false,
  error: null,
  filterCountry: null,
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

  const setSortByCountry: UserActions['setSortByCountry'] = payload =>
    dispatch({ type: UserActionsKind.SET_SORT_BY_COUNTRY, payload })

  const setError: UserActions['setError'] = payload =>
    dispatch({ type: UserActionsKind.SET_ERROR, payload })

  const setFilterCountry: UserActions['setFilterCountry'] = payload =>
    dispatch({ type: UserActionsKind.SET_FILTER_COUNTRY, payload })

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          setUsers,
          setShowColors,
          setSortByCountry,
          setError,
          setFilterCountry,
        },
      }}>
      {children}
    </UserContext.Provider>
  )
}
