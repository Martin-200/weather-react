import React, { createContext, useState } from 'react'

interface AppContextType {
    appName: string
    setAppName: React.Dispatch<React.SetStateAction<string>>
    isSearchingBarLoading: boolean
    setIsSearchingBarLoading: React.Dispatch<React.SetStateAction<boolean>>
    lastSearchedCityKey: string
    searchHistoryKey: string
}

const initialAppContext: AppContextType = {
    appName: 'meteou',
    setAppName: () => { },
    isSearchingBarLoading: false,
    setIsSearchingBarLoading: () => { },
    lastSearchedCityKey: 'lastSearchedCity',
    searchHistoryKey: 'searchHistory',
}

const AppContext = createContext<AppContextType>(initialAppContext)

const AppContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [appName, setAppName] = useState<string>(initialAppContext.appName)
    const [isSearchingBarLoading, setIsSearchingBarLoading] = useState<boolean>(initialAppContext.isSearchingBarLoading)
    const lastSearchedCityKey = initialAppContext.lastSearchedCityKey
    const searchHistoryKey = initialAppContext.searchHistoryKey

    return (
        <AppContext.Provider
            value={{
                appName,
                setAppName,
                isSearchingBarLoading,
                setIsSearchingBarLoading,
                lastSearchedCityKey,
                searchHistoryKey
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
export { AppContextProvider }