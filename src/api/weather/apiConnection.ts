export const api = {
    base: 'https://api.openweathermap.org/',
    key: '7a4a05041d18b026aa29508b0cf9efcd', // 7a4a05041d18b026aa29508b0cf9efcd 6aadf54f59f9c2d3a4c3973628015400
}

export const apiCall = (call: string, lang: string = 'fr') => {
    return `${api.base}${call.replaceAll(' ', '+')}&units=metric&lang=${lang}&appid=${api.key}`
}