import { QueryFunction } from '@tanstack/react-query'
import { User } from '../interfaces/Users'

export type FetchResponse = {
  nextCursor?: number
  users: User[]
}

export const fetchUsers: QueryFunction<FetchResponse> = async ({
  pageParam = 1,
}) =>
  await fetch(
    `https://randomuser.me/api/?results=10&seed=cesaralvarod&page=${pageParam}`
  )
    .then(res => {
      if (!res.ok) throw new Error('An error occurred while fetching users')
      return res.json()
    })
    .then(data => {
      const currentPage = data.info.page as number
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1

      return {
        users: data.results,
        nextCursor,
      }
    })
