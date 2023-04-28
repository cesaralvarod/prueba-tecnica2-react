import { useContext } from 'react'

import { User } from '../interfaces/Users'
import UserRow from './UserRow'
import { UserContext } from '../context/UserContext'

interface Props {
  users: User[]
  handleDelete: (arg0: string) => void
}

const NoData = () => (
  <tr className="text-center font-md">
    <td colSpan={5} className="py-4">
      No users
    </td>
  </tr>
)

export default function ListOfUsers({ users, handleDelete }: Props) {
  const { state } = useContext(UserContext)
  const { showColors } = state

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Picture
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Lastname
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => (
            <UserRow
              key={user.login.uuid}
              user={user}
              index={index}
              showColors={showColors}
              handleDelete={handleDelete}
            />
          ))}
          {users.length === 0 && <NoData />}
        </tbody>
      </table>
    </div>
  )
}
