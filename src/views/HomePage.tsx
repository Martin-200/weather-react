import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import GraphUpIcon from '../assets/icons/GraphUpIcon.svg?react'
import HeroBanner from '../assets/images/hero-banner.png'
import '../assets/scss/views/HomePage.scss'
import CallToAction from '../components/CallToAction'
import AppContext from '../contexts/AppContext'

const HomePage: React.FC = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <>
            <section className='hero'>
                <div className='hero__content'>
                    <h1 className='hero__content__title'>
                        {t('home.title')}
                    </h1>
                    <p className='hero__content__description'>
                        {t('home.description', { appName: context.appName })}
                    </p>
                    <CallToAction
                        icon={GraphUpIcon}
                        label={t('home.seeForecast')}
                        handleClickAction={() => { navigate('/forecast') }}
                    />
                </div>
                <div className='hero__banner'>
                    <img src={HeroBanner} alt='HeroBanner' />
                </div>
            </section>
        </>
    )
}

export default HomePage
