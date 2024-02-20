import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CallToAction from '../components/CallToAction'
import { ErrorPageProps } from '../types/views/errorPage'
import HomeIcon from '../assets/icons/HomeIcon.svg?react'
import '../assets/scss/views/ErrorPage.scss'
import AppContext from '../contexts/AppContext'

const ErrorPage = ({ errorCode, description }: ErrorPageProps) => {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <>
            <section className='error'>
                <p className='error__code'>{t('error.code', { errorCode })}</p>
                <h1 className='error__message'>{description}</h1>
                <CallToAction
                    label={t('error.backHome')}
                    color='white'
                    icon={HomeIcon}
                    handleClickAction={() => {
                        navigate(`${context.isProduction ? context.productionBaseRoute : ''}/forecast`)
                    }}
                />
            </section>
        </>
    )
}

export default ErrorPage
