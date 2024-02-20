import { AppContextProvider } from './contexts/AppContext'
import AppLayout from './layouts/AppLayout'
import AppRoutes from './routes/AppRoutes'

const App = () => {
    return (
        <AppContextProvider>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </AppContextProvider>
    )
}

export default App
