import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n.ts'

const isProduction = process.env.NODE_ENV === 'production'

import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter basename={isProduction ? '/weather-react' : '/'}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
