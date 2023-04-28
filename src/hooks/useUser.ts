import { useEffect, useRef, useContext, useMemo } from 'react'
import { SortBy, User } from '../interfaces/Users'
import { UserContext } from '../context/UserContext'

const fetchUsers = async (page: number) =>
  await fetch(
    `https://randomuser.me/api/?results=10&seed=cesaralvarod&page=${page}`
  )
    .then(res => {
      if (!res.ok) throw new Error('An error occurred while fetching users')
      return res.json()
    })
    .then(data => data.results)

export const useUser = () => {
  const { state, actions } = useContext(UserContext)

  const {
    users,
    showColors,
    error,
    filterCountry,
    sorting,
    loading,
    currentPage,
  } = state
  const { setUsers, setError, setLoading, setCurrentPage } = actions

  const initialUsers = useRef<User[]>([])

  useEffect(() => {
    setLoading(true)
    fetchUsers(currentPage)
      .then(data => {
        const newUsers = [...users, ...data]
        setUsers(newUsers)
        initialUsers.current = newUsers
      })
      .catch(err => {
        console.log(err)
        setError(err)
        setUsers([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

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
    loading,
    currentPage,

    handleDelete,
    handleReset,
    setCurrentPage,
  }
}
