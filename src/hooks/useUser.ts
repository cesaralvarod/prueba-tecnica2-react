import { useContext, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { SortBy, User } from '../interfaces/Users'
import { UserContext } from '../context/UserContext'
import { FetchResponse, fetchUsers } from '../services/users'

export const useUser = () => {
  const {
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    data,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery<FetchResponse>(['users'], fetchUsers, {
    getNextPageParam: lastPage => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  })

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? [] // flatMap -> aplanar a un mismo nivel

  const { state, actions } = useContext(UserContext)

  const { showColors, filterCountry, sorting } = state
  const { setUsers } = actions

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.trimStart().toLowerCase())
        )
      : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LASTNAME]: user => user.name.last,
    }

    if (sorting === SortBy.NONE) return filteredUsers

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    }) // otra alternativa es usar toSorted
  }, [filteredUsers, sorting])

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = async () => await refetch()

  return {
    users: sortedUsers,
    showColors,
    isLoading: isLoading || isFetchingNextPage,
    isError,
    hasNextPage,

    handleDelete,
    handleReset,
    fetchNextPage,
  }
}
