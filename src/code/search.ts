export const updateSearchHistory = (searchedCity: string, historySize: number, searchHistoryKey: string) => {
    if (searchedCity) {
        const storedHistory = localStorage.getItem(searchHistoryKey)
        let historyArray = storedHistory ? JSON.parse(storedHistory) : []
        historyArray = [searchedCity, ...historyArray.filter((city: string) => city !== searchedCity)].slice(0, historySize)
        localStorage.setItem(searchHistoryKey, JSON.stringify(historyArray))
    }
}