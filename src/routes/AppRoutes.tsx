import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import HomePage from '../views/HomePage'
import WeatherForecastPage from '../views/WeatherForecastPage'
import ErrorPage from '../views/ErrorPage'
import AppContext from '../contexts/AppContext'

const AppRoutes: React.FC = () => {
    const context = useContext(AppContext)
    const { t } = useTranslation()
    
    return (
        <Routes>
            <Route
                path={`${context.isProduction ? context.productionBaseRoute : ''}/`}
                element={<HomePage />}
            />
            <Route
                path={`${context.isProduction ? context.productionBaseRoute : ''}/forecast`}
                element={<WeatherForecastPage />}
            />
            <Route
                path='*'
                element={<ErrorPage errorCode={404} description={t('error.404')} />}
            />
        </Routes>
    )
}

export default AppRoutes
