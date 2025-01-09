import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx';
import Login from './Login/Login.jsx'
import CreateAccount from './CreateAcc/CA.jsx'
import CA from './CreateAcc/CA1.jsx'
import SD from './Dashboard/StudentDashboard.jsx'
import HP from './Homepage/homepage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
