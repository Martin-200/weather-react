export interface CityCoords {
    name: string
    local_names?: { [key: string]: string }
    lat: number
    lon: number
    country: string
}