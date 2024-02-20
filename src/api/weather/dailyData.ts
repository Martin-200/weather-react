export interface DailyData {
    dt: number
    temperatures: number[]
    humidity: number[]
    windSpeed: number[]
    temperatureAverage?: number
    humidityAverage?: number
    windSpeedAverage?: number
    mostCommonWeatherIcon?: string
    mostCommonWeatherDescription?: string
    weatherIcons: string[]
}

function calculateDailyData(forecasts: any): DailyData[] {
    const dailyData: DailyData[] = []

    forecasts.forEach((forecast: any) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()
        const existingDayIndex = dailyData.findIndex(day => new Date(day.dt * 1000).toLocaleDateString() === date)

        if (existingDayIndex === -1) {
            dailyData.push({
                dt: forecast.dt,
                temperatures: [forecast.main.temp],
                humidity: [forecast.main.humidity],
                windSpeed: [convertMStoKMH(forecast.wind.speed)],
                weatherIcons: [forecast.weather[0].icon],
            })
        } else {
            dailyData[existingDayIndex].temperatures.push(forecast.main.temp)
            dailyData[existingDayIndex].humidity.push(forecast.main.humidity)
            dailyData[existingDayIndex].windSpeed.push(convertMStoKMH(forecast.wind.speed))
            dailyData[existingDayIndex].weatherIcons.push(forecast.weather[0].icon)
        }
    })

    dailyData.forEach(day => {
        day.temperatureAverage = calculateAverage(day.temperatures)
        day.humidityAverage = calculateAverage(day.humidity)
        day.windSpeedAverage = calculateAverage(day.windSpeed)
        day.temperatureAverage = Math.round(day.temperatureAverage)
        day.humidityAverage = Math.round(day.humidityAverage)
        day.windSpeedAverage = Math.round(day.windSpeedAverage)
        day.mostCommonWeatherIcon = getMostCommonWeatherIcon(day.weatherIcons)
        day.mostCommonWeatherDescription = getMostCommonWeatherDescription(forecasts, day.mostCommonWeatherIcon)
        if (day.mostCommonWeatherDescription) {
            day.mostCommonWeatherDescription = day.mostCommonWeatherDescription.charAt(0).toUpperCase() + day.mostCommonWeatherDescription.slice(1)
        }
    })

    return dailyData
}

function convertMStoKMH(speed: number): number {
    return Math.round(speed * 3.6)
}

function getMostCommonWeatherIcon(weatherIcons: string[]): string | undefined {
    const iconCounts: { [icon: string]: number } = {}
    let maxCount = 0
    let mostCommonIcon: string | undefined

    weatherIcons.forEach(icon => {
        icon = icon.slice(0, -1)
        iconCounts[icon] = (iconCounts[icon] || 0) + 1
        if (iconCounts[icon] > maxCount) {
            maxCount = iconCounts[icon]
            mostCommonIcon = icon
        }
    })

    return mostCommonIcon
}

function getMostCommonWeatherDescription(forecasts: any, icon: string | undefined): string | undefined {
    if (!icon) return undefined

    const descriptionCounts: { [description: string]: number } = {}
    let maxCount = 0
    let mostCommonDescription: string | undefined

    forecasts.forEach((forecast: any) => {
        if (forecast.weather[0].icon.slice(0, -1) === icon) {
            const description = forecast.weather[0].description
            descriptionCounts[description] = (descriptionCounts[description] || 0) + 1
            if (descriptionCounts[description] > maxCount) {
                maxCount = descriptionCounts[description]
                mostCommonDescription = description
            }
        }
    })

    return mostCommonDescription
}

function calculateAverage(values: number[]): number {
    const sum = values.reduce((acc, val) => acc + val, 0)
    return sum / values.length
}

function formatDate(dt: number, lang: string, options: any): string {
    const date = new Date(dt * 1000)
    return date.toLocaleDateString(lang, options)
}

export default calculateDailyData
export { formatDate }
