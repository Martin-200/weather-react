import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/scss/components/ThemeSwitcher.scss'
import SunIcon from '../assets/icons/SunIcon.svg?react'
import MoonIcon from '../assets/icons/MoonIcon.svg?react'
import SystemIcon from '../assets/icons/SystemIcon.svg?react'

const ThemeSwitcher: React.FC = () => {
    const navigate = useNavigate()
    
    const localStorageKey = 'app-theme'
    const [theme, setTheme] = useState(
        localStorage.getItem(localStorageKey) ? localStorage.getItem(localStorageKey) : 'system'
    )
    const doc = document.documentElement
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const options = [
        {
            icon: SunIcon,
            text: 'light'
        },
        {
            icon: MoonIcon,
            text: 'dark'
        },
        {
            icon: SystemIcon,
            text: 'system'
        }
    ]

    const onWindowMatch = (): void => {
        if (localStorage.getItem(localStorageKey) === 'dark' || (!(localStorageKey in localStorage) && darkQuery.matches)){
            doc.classList.add('dark')
        } else {
            doc.classList.remove('dark')
        }
    }
    onWindowMatch()

    useEffect(() => {
        switch (theme) {
            case 'light':
                doc.classList.remove('dark')
                localStorage.setItem(localStorageKey, 'light')
                break

            case 'dark':
                doc.classList.add('dark')
                localStorage.setItem(localStorageKey, 'dark')
                break

            default:
                localStorage.removeItem(localStorageKey)
                onWindowMatch()
                break
        }
    }, [theme, navigate])

    darkQuery.addEventListener('change', (e) => {
        if (!(localStorageKey in localStorage)){
            if (e.matches){
                doc.classList.add('dark')
            } else {
                doc.classList.remove('dark')
            }
        }
    })

    return (
        <>
            <div className='theme-switcher'>
                {options?.map((opt) => (
                    <button
                        key={opt.text}
                        className={`theme-switcher__theme ${theme === opt.text && 'theme-switcher__theme--selected'}`}
                        onClick={() => { setTheme(opt.text) }}
                    >
                        <opt.icon />
                    </button>
                ))}

            </div>
        </>
    )
}

export default ThemeSwitcher
