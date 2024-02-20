import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import ThemeSwitcher from './ThemeSwitcher'
import AppContext from '../contexts/AppContext'
import '../assets/scss/components/Footer.scss'
import GithubIcon from '../assets/icons/GithubIcon.svg?react'
import EmailIcon from '../assets/icons/EmailIcon.svg?react'

const Footer: React.FC = () => {
    const context = useContext(AppContext)
    const { t } = useTranslation()
    
    return (
        <>
            <footer className='footer'>
                <div className='footer__container'>
                    <div className='footer-wave'>
                        <div className='footer-wave__container'>
                            <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
                                <path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'></path>
                            </svg>
                        </div>
                    </div>
                    
                    <div className='footer-infos'>
                        <div className='footer-infos__contact'>
                            <p id='copyright'>{new Date().getFullYear()} © {context.appName}</p>
                            <div className='footer-infos__contact__social-networks'>
                                <a
                                    className='footer-infos__contact__social-networks--item'
                                    href='https://github.com/Martin-200'
                                    title='Github'
                                    target='_blank'
                                >
                                    <GithubIcon />
                                </a>
                                <a
                                    className='footer-infos__contact__social-networks--item'
                                    href='mailto:martin.piolat69@gmail.com'
                                    title={t('footer.sendAMail')}
                                    target='_blank'
                                >
                                    <EmailIcon />
                                </a>
                            </div>
                        </div>

                        <ThemeSwitcher />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer