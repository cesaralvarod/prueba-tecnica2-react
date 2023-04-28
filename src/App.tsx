import Buttons from './components/Buttons'
import ListOfUsers from './components/ListOfUsers'
import { useUser } from './hooks/useUser'

function App() {
  const { users, handleDelete, handleReset } = useUser()

  return (
    <div className="container mx-auto py-5">
      <h1 className="pb-5 font-bold uppercase text-center text-slate-800 text-3xl">
        Table of users
      </h1>

      <Buttons handleReset={handleReset} />

      <ListOfUsers users={users} handleDelete={handleDelete} />
    </div>
  )
}

export default App
