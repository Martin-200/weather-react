import { Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import HomePage from '../views/HomePage'
import WeatherForecastPage from '../views/WeatherForecastPage'
import ErrorPage from '../views/ErrorPage'

const AppRoutes: React.FC = () => {
    const { t } = useTranslation()
    
    return (
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='/forecast'
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
