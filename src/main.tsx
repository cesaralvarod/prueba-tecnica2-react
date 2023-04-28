import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UsersProvider } from './context/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersProvider>
    <App />
  </UsersProvider>
)
