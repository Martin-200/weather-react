import '../assets/scss/layouts/AppLayout.scss'
import { AppLayoutProps } from '../types/layouts/appLayout'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <>
            <Header />
            <div className='layout'>
                <div className='layout__container layout-app'>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AppLayout