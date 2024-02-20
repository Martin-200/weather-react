import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CallToAction from '../components/CallToAction'
import { ErrorPageProps } from '../types/views/errorPage'
import HomeIcon from '../assets/icons/HomeIcon.svg?react'
import '../assets/scss/views/ErrorPage.scss'

const ErrorPage = ({ errorCode, description }: ErrorPageProps) => {
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
                        navigate('/')
                    }}
                />
            </section>
        </>
    )
}

export default ErrorPage
