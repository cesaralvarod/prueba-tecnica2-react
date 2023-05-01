import Buttons from './components/Buttons'
import ListOfUsers from './components/ListOfUsers'
import LoadingSpinner from './components/LoadingSpinner'
import { useUser } from './hooks/useUser'

function App() {
  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    handleDelete,
    handleReset,
    fetchNextPage,
  } = useUser()

  return (
    <body className={`${isLoading && 'overflow-hidden'}`}>
      <div className="px-4">
        <div className="container mx-auto max-w-[1200px] py-5">
          <h1 className="pb-5 font-bold uppercase text-center text-slate-800 text-3xl">
            Table of users
          </h1>

          <Buttons handleReset={handleReset} />

          <ListOfUsers users={users} handleDelete={handleDelete} />

          {!isLoading && !isError && hasNextPage === true && (
            <div className="text-center pt-2">
              <button
                className="text-center rounded-lg bg-cyan-200 hover:bg-cyan-300 text-sm px-4 py-1 font-bold text-slate-700"
                onClick={() => fetchNextPage()}>
                Load more...
              </button>
            </div>
          )}
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
    </body>
  )
}

export default App
