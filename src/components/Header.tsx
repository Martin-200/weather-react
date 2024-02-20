import { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { languagesDatas } from '../../i18n'

import '../assets/scss/components/Header.scss'
import CallToAction from './CallToAction'
import Tooltip from './Tooltip'
import AppContext from '../contexts/AppContext'
import Logo from '../assets/images/logo.png'
import SendIcon from '../assets/icons/SendIcon.svg?react'
import LoaderIcon from '../assets/icons/LoaderIcon.svg?react'
import SearchIcon from '../assets/icons/SearchIcon.svg?react'
import WorldIcon from '../assets/icons/WorldIcon.svg?react'
import { updateSearchHistory } from '../code/search';

const Header: React.FC = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { t, i18n } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)
    const [city, setCity] = useState<string>('')
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState<boolean>(false)

    useEffect(() => { // Au chargement d'une page/route, le contenu de la barre de recherche est accordé avec la recherche envoyée
        const lastSearchedCity: string | null = (location.state && location.state.city) ? location.state.city : (localStorage.getItem(context.lastSearchedCityKey) || '')

        if (lastSearchedCity && lastSearchedCity.length) {
            setCity(lastSearchedCity)
        }
    }, [location.state, navigate])

    const searchCityForecast = (searchedCity: string): void => {
        if (searchedCity.length) { // Si la recherche n'est pas vide, alors la requête est envoyée
            localStorage.setItem(context.lastSearchedCityKey, searchedCity)
            context.setIsSearchingBarLoading(true)
            updateSearchHistory(searchedCity, 12, context.searchHistoryKey)
            navigate(`${context.isProduction ? context.productionBaseRoute : ''}/forecast`, {
                state: {
                    city: searchedCity
                }
            })
        }
    }

    const focusInput = (): void => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <>
            <header className='header'>
                <div className='header__container'>
                    <div className='brand'>
                        <div className='brand__container' onClick={() => { navigate(`${context.isProduction ? context.productionBaseRoute : ''}/`) }}>
                            <img className='brand__logo' src={Logo} alt={`Logo ${context.appName}`} />
                            <strong className='brand__name'>{context.appName}</strong>
                        </div>
                    </div>
                    <div className='search'>
                        <form className='search__box' onClick={focusInput} onSubmit={(e) => { e.preventDefault() }}>
                            <SendIcon className='search__box__icon' />
                            <input
                                ref={inputRef}
                                value={city}
                                className='search__box__input'
                                type='search'
                                name='search-by-name'
                                id='search-by-name'
                                placeholder={t('header.searchBarPlaceholder')}
                                onChange={(e) => { setCity(e.target.value) }}
                            />
                            <CallToAction
                                label={t('header.search')}
                                color='black'
                                size='small'
                                type='submit'
                                icon={context.isSearchingBarLoading ? LoaderIcon : SearchIcon}
                                iconType={context.isSearchingBarLoading ? 'fill' : 'stroke'}
                                spin={context.isSearchingBarLoading}
                                handleClickAction={() => { searchCityForecast(city.trim()) }}
                            />
                        </form>
                    </div>
                    <div className='language-selector'>
                        <div className='language-selector__container' title={t('header.switchLanguageTip')}>
                            <CallToAction
                                label={t('header.language')}
                                color='blue'
                                size='small'
                                icon={WorldIcon}
                                handleClickAction={() => {
                                    setIsLanguageSelectorOpen(!isLanguageSelectorOpen)
                                }}
                            />
                            {isLanguageSelectorOpen && (
                                <Tooltip position={{ top: '16' }}>
                                    <>
                                        <div className='language-selector__tooltip'>
                                            {Object.keys(languagesDatas).map((lang) => (
                                                <button key={lang} className={`language-selector__tooltip__language ${lang === i18n.language && 'language-selector__tooltip__language--selected'}`} onClick={() => {
                                                    setIsLanguageSelectorOpen(false)
                                                    i18n.changeLanguage(lang)
                                                }}>
                                                    <img className='language-selector__tooltip__language--flag' src={languagesDatas[lang as keyof typeof languagesDatas].flag} alt={`${lang} flag`} />
                                                    <p className='language-selector__tooltip__language--name'>{languagesDatas[lang as keyof typeof languagesDatas].nativeName}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
