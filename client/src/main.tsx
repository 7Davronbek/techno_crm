import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/main.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <App/>
    </>,
)
