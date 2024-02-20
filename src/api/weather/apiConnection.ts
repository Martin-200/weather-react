export const api = {
    base: 'https://api.openweathermap.org/',
    key: import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string,
}

export const apiCall = (call: string, lang: string = 'fr') => {
    return `${api.base}${call.replaceAll(' ', '+')}&units=metric&lang=${lang}&appid=${api.key}`
}