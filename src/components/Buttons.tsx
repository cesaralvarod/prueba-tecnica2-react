import { useContext } from 'react'

import { UserContext } from '../context/UserContext'
import { SortBy } from '../interfaces/Users'

interface Props {
  handleReset: () => void
}

export default function Buttons({ handleReset }: Props) {
  const { state, actions } = useContext(UserContext)
  const { showColors, sorting } = state
  const { setShowColors, setFilterCountry, setSorting } = actions

  const handleToggleShowColors = () => setShowColors(!showColors)
  const handleSortByCountry = () =>
    setSorting(sorting === SortBy.COUNTRY ? SortBy.NONE : SortBy.COUNTRY)

  return (
    <div className="pb-5 flex gap-2">
      <button
        className={`bg-purple-200 hover:bg-purple-300 px-4 py-1 font-bold text-slate-700 rounded-lg ${
          showColors && 'bg-purple-300'
        }`}
        onClick={handleToggleShowColors}>
        Color rows
      </button>
      <button
        className={`bg-red-200 hover:bg-red-300 px-4 py-1 font-bold text-slate-700 rounded-lg ${
          sorting === SortBy.COUNTRY && 'bg-red-300'
        }`}
        onClick={handleSortByCountry}>
        Sort by country
      </button>
      <button
        className="bg-orange-200 hover:bg-orange-300 px-4 py-1 font-bold text-slate-700 rounded-lg"
        onClick={handleReset}>
        Reset table
      </button>

      <input
        type="text"
        placeholder="Belgium, Canada, Spain..."
        className="px-4 py-1 placeholder:font-semibold text-md border-solid border-2 border-slate-200 ring-slate-200 focus:border-slate-300 rounded-lg outline-none focus:outline-none"
        onChange={event => setFilterCountry(event.target.value)}
      />
    </div>
  )
}
