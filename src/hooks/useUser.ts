import { useEffect, useRef, useContext, useMemo } from 'react'
import { SortBy, User } from '../interfaces/Users'
import { UserContext } from '../context/UserContext'

const API_URL = 'https://randomuser.me/api/?results=100'

export const useUser = () => {
  const { state, actions } = useContext(UserContext)

  const { users, showColors, error, filterCountry, sorting } = state
  const { setUsers, setError } = actions

  const initialUsers = useRef<User[]>([])

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then(data => data.json())
        .then(data => {
          setUsers(data.results)
          initialUsers.current = data.results
        })
        .catch(err => {
          console.log(err)
          setError('An error occurred while fetching users')
          setUsers([])
        })
    }

    fetchData()
  }, [])

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

  const handleReset = () => {
    setUsers(initialUsers.current)
  }

  return {
    users: sortedUsers,
    showColors,
    error,

    handleDelete,
    handleReset,
  }
}
