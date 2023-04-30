import Buttons from './components/Buttons'
import ListOfUsers from './components/ListOfUsers'
import LoadingSpinner from './components/LoadingSpinner'
import { useUser } from './hooks/useUser'

function App() {
  const {
    users,
    loading,
    currentPage,
    handleDelete,
    handleReset,
    setCurrentPage,
  } = useUser()

  return (
    <body className={`${loading && 'overflow-hidden'}`}>
      <div>
        <div className="container mx-auto py-5">
          <h1 className="pb-5 font-bold uppercase text-center text-slate-800 text-3xl">
            Table of users
          </h1>

          <Buttons handleReset={handleReset} />

          <ListOfUsers users={users} handleDelete={handleDelete} />

          {!loading && (
            <div className="text-center pt-2">
              <button
                className="text-center rounded-lg bg-cyan-200 hover:bg-cyan-300 text-sm px-4 py-1 font-bold text-slate-700"
                onClick={() => setCurrentPage(currentPage + 1)}>
                Load more...
              </button>
            </div>
          )}
        </div>
        {loading && <LoadingSpinner />}
      </div>
    </body>
  )
}

export default App
