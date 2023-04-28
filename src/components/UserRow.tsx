import { User } from '../interfaces/Users'

interface Props {
  user: User
  index: number
  showColors: boolean

  handleDelete: (arg0: string) => void
}

export default function UserRow({
  user,
  index,
  showColors,
  handleDelete,
}: Props) {
  const colorsClass = showColors
    ? index % 2 === 0
      ? 'bg-white'
      : 'bg-gray-50'
    : 'bg-white'

  return (
    <tr
      className={`${colorsClass} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50`}>
      <td className="px-6 py-4">
        <img
          src={user.picture.thumbnail}
          alt={`Picture of ${user.name.first} ${user.name.last}`}
          className="rounded-lg"
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.name.first}
      </th>
      <td className="px-6 py-4">{user.name.last}</td>
      <td className="px-6 py-4">{user.location.country}</td>
      <td className="px-6 py-4">
        <button
          className="bg-teal-200 px-4 py-1 rounded-lg font-bold text-slate-700 hover:bg-teal-300"
          onClick={() => handleDelete(user.login.uuid)}>
          Delete 🗑️
        </button>
      </td>
    </tr>
  )
}
