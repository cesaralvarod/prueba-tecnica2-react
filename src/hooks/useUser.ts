import { useEffect, useRef, useContext, useMemo } from 'react'
import { User } from '../interfaces/Users'
import { UserContext } from '../context/UserContext'

const API_URL = 'https://randomuser.me/api/?results='

export const useUser = () => {
  const { state, actions } = useContext(UserContext)

  const { users, showColors, sortByCountry, error, filterCountry } = state
  const { setUsers, setError } = actions

  const initialUsers = useRef<User[]>([])

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL + 5)
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
      : initialUsers.current
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...users].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        ) // usar toSorted es ideal, pero no esta disponible
      : filteredUsers
  }, [sortByCountry, filteredUsers])

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
    sortByCountry,
    error,

    handleDelete,
    handleReset,
  }
}
