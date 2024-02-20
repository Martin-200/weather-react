import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { apiCall } from '../api/weather/apiConnection'
import AppContext from '../contexts/AppContext'
import calculateDailyData, { formatDate } from '../api/weather/dailyData'
import '../assets/scss/views/WeatherForecastPage.scss'
import SearchIcon from '../assets/icons/SearchIcon.svg?react'
import CityIcon from '../assets/icons/CityIcon.svg?react'
import LoaderIcon from '../assets/icons/LoaderIcon.svg?react'
import { updateSearchHistory } from '../code/search'

const WeatherForecastPage: React.FC = () => {
    const context = useContext(AppContext)
    const location = useLocation()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    const [isACitySearchedFor, setIsACitySearchedFor] = useState<boolean>(false)
    const [areCityForecastFound, setAreCityForecastFound] = useState<boolean>(false)
    const [cityCoords, setCityCoords] = useState([{}])
    const [cityForecasts, setCityForecasts] = useState([{}])

    const [searchHistory, setSearchHistory] = useState<string[]>([])

    useEffect(() => {
        const storedHistory = localStorage.getItem(context.searchHistoryKey)
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory))
        }
    }, [location.state, navigate])

    useEffect(() => {
        loadCityForecastDatas()
    }, [location.state, navigate])

    const loadCityForecastDatas = async () => {
        setIsACitySearchedFor(false)
        setAreCityForecastFound(false)
        setCityCoords([{}])
        setCityForecasts([{}])

        const lastSearchedCity = location.state?.city || localStorage.getItem(context.lastSearchedCityKey) || ''

        if (lastSearchedCity && lastSearchedCity.length) {
            setIsACitySearchedFor(true)

            try {
                const cityCoords = await fetchCityCoords(lastSearchedCity)

                if (cityCoords && cityCoords.length && cityCoords[0] && cityCoords[0].lat && cityCoords[0].lon) {
                    const forecasts = await fetchCoordsForecast(cityCoords[0].lat, cityCoords[0].lon)

                    if (forecasts) {
                        setAreCityForecastFound(true)
                    }
                    context.setIsSearchingBarLoading(false)
                } else {
                    context.setIsSearchingBarLoading(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
                context.setIsSearchingBarLoading(false)
            }
        }
    }

    const fetchCityCoords = async (city: string) => {
        const call = `geo/1.0/direct?q=${city.toLowerCase().trim()}&limit=1`

        try {
            const response = await fetch(apiCall(call, i18n.language))
            const result = await response.json()
            setCityCoords(() => result) // Utilisation de la mise à jour d'état fonctionnelle
            return result
        } catch (error) {
            // console.error('Error fetching coords data:', error)
            navigate('/')
            return []
        }
    }

    const fetchCoordsForecast = async (lat: number, lon: number) => {
        const call = `data/2.5/forecast?lat=${lat}&lon=${lon}`

        try {
            const response = await fetch(apiCall(call, i18n.language))
            const result = await response.json()
            const forecasts = calculateDailyData(result.list)
            setCityForecasts(() => forecasts) // Utilisation de la mise à jour d'état fonctionnelle
            return true
        } catch (error) {
            // console.error('Error fetching weather data:', error)
            navigate('/')
            return false
        }
    }

    const searchCityForecast = (searchedCity: string): void => {
        if (searchedCity.length) { // Si la recherche n'est pas vide, alors la requête est envoyée
            localStorage.setItem(context.lastSearchedCityKey, searchedCity)
            context.setIsSearchingBarLoading(true)
            updateSearchHistory(searchedCity, 12, context.searchHistoryKey)
            navigate('/forecast', {
                state: {
                    city: searchedCity
                }
            })
        }
    }

    return (
        <>
            <div className='weather'>
                {isACitySearchedFor
                    ? (
                        <>
                            {areCityForecastFound
                                ? ( // Si une recherche est active et que les prévisions météo ont été trouvées
                                    <>
                                        {(cityCoords && cityCoords[0] && cityCoords[0].name)
                                            ? ( // Si les coordonnées de la ville sont trouvées
                                                <>
                                                    <section className='weather__results'>
                                                        <p className='weather__results__lead'>
                                                            {t('weatherForecast.howIsTheWeather')}
                                                        </p>
                                                        <h1 className='weather__results__location'>
                                                            <span className='weather__results__location--city'>
                                                                {cityCoords[0].local_names && cityCoords[0].local_names[i18n.language]
                                                                    ? (
                                                                        <>{cityCoords[0].local_names[i18n.language]}</>
                                                                    )
                                                                    : (
                                                                        <>{cityCoords[0].name}</>
                                                                    )
                                                                }
                                                            </span>
                                                            <span className='weather__results__location--country'>
                                                                {cityCoords[0].country}
                                                            </span>
                                                        </h1>
                                                    </section>

                                                    <section className='weather__list'>
                                                        {cityForecasts.map((cityForecast, index) => (
                                                            <div key={index} className='weather-card'>
                                                                <div className='weather-card__content'>
                                                                    <div className='weather-card__content--background'>
                                                                        <div className='weather-card__content__temperature'>
                                                                            {cityForecast.temperatureAverage}
                                                                            <span className='weather-card__content__temperature--degree'>°C</span>
                                                                        </div>
                                                                        <div className='weather-card__content__side-informations'>
                                                                            <p className='weather-card__content__side-informations--humidity'>
                                                                                <span>{t('weatherForecast.humidity')}</span> : {cityForecast.humidityAverage}%
                                                                            </p>
                                                                            <p className='weather-card__content__side-informations--wind'>
                                                                                <span>{t('weatherForecast.wind')}</span> : {cityForecast.windSpeedAverage} km/h
                                                                            </p>
                                                                        </div>
                                                                        <div className='weather-card__content__weather-icon'>
                                                                            <img src={`./src/assets/images/weathers/${cityForecast.mostCommonWeatherIcon}.png`} alt={cityForecast.mostCommonWeatherDescription} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='weather-card__footer'>
                                                                    <div className='weather-card__footer__date'>
                                                                        <p className='weather-card__footer__date--weekday'>
                                                                            {formatDate(cityForecast.dt, i18n.language, { weekday: 'long' })}
                                                                        </p>
                                                                        <div className='weather-card__footer__date--separator'></div>
                                                                        <p className='weather-card__footer__date--calendarday'>
                                                                            {formatDate(cityForecast.dt, i18n.language, { day: '2-digit' })} {formatDate(cityForecast.dt, i18n.language, { month: 'short' })}
                                                                        </p>
                                                                    </div>
                                                                    <div className='weather-card__footer__weather'>

                                                                        <p className='weather-card__footer__weather--description'>
                                                                            {cityForecast.mostCommonWeatherDescription}
                                                                        </p>

                                                                        <div className='weather-card__footer__weather--approximate-temperatures'>
                                                                            <p>
                                                                                {Math.round(Math.min(...cityForecast.temperatures))}
                                                                                <span>°C</span>
                                                                            </p>
                                                                            <p>/</p>
                                                                            <p>
                                                                                {Math.round(Math.max(...cityForecast.temperatures))}
                                                                                <span>°C</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </section>
                                                </>
                                            )
                                            : ( // Si les coordonnées de la ville ne sont plus existantes / pas à jour
                                                <>
                                                    <div>error#1</div>
                                                </>
                                            )
                                        }
                                    </>
                                )
                                : ( // Si une recherche est active mais qu'aucun résultat n'a été trouvé en rapport avec la recherche
                                    <>
                                        {context.isSearchingBarLoading
                                            ? ( // Si une requête est en cours
                                                <>
                                                    <div className='weather__list--is-loading'>
                                                        <LoaderIcon />
                                                    </div>
                                                </>
                                            )
                                            : ( // Si aucune requête n'est en cours
                                                <>
                                                    <section className='weather__results'>
                                                        <div className='weather__results--no-results'>
                                                            <h1>
                                                                {t('weatherForecast.noResultsTitle')}
                                                            </h1>
                                                            <p>
                                                                {t('weatherForecast.noResultsDescription')}
                                                            </p>
                                                            <SearchIcon />
                                                        </div>
                                                    </section>
                                                </>

                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                    : (
                        <>
                            {areCityForecastFound
                                ? ( // Si aucune recherche n'est lancée mais qu'il reste des résultats persistants
                                    <>
                                        <div>error#2</div>
                                    </>
                                )
                                : ( // Si aucune recherche n'est lancée et qu'aucun résultat n'en découle
                                    <>
                                        <section className='weather__results'>
                                            <div className='weather__results--no-search'>
                                                <h1>
                                                    {t('weatherForecast.noSearchTitle')}
                                                </h1>
                                                <p>
                                                    {t('weatherForecast.noSearchDescription')}
                                                </p>
                                                <SearchIcon />
                                            </div>
                                        </section>
                                    </>
                                )
                            }
                        </>
                    )
                }

                <section className='weather__history'>
                    <h2 className='weather__history__title'>
                        {t('weatherForecast.history')}
                    </h2>
                    <ul className='weather__history__list'>
                        {searchHistory.map((city, index) => (
                            <a
                                href='#'
                                key={index}
                                className='weather__history__card'
                                onClick={() => { searchCityForecast(city.trim()) }}
                            >
                                <CityIcon />
                                <p className='weather__history__card--title'>
                                    {city}
                                </p>
                            </a>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    )
}

export default WeatherForecastPage
