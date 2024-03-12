import './styles/global.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TableProvider } from './context/TableContext.tsx'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableProvider>
      <App />
    </TableProvider>
  </StrictMode>,
)
