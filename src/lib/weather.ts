import {WeatherData, WeatherReport} from "./types"

export async function fetchWeather(): Promise<WeatherReport> {
    try {
        const response = await fetch('https://mano.acoris.lt/weather/weather');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        const mockResponse: WeatherReport = {
            data: [
                {
                    code: '1',
                    date: new Date().toISOString(),
                    temperature: '30',
                    humidity: '50',
                    preassure: '105',
                    pm: '103'
                }
            ]
        };
        console.error('Failed to fetch weather data from API, returning mock data: ', error);
        return mockResponse;
    }
}

function updateElementTextById(id: string, text: string) {
    const element = document.getElementById(id)
    if (element) {
        const textElement = element.querySelector('.elementor-icon-list-text')
        textElement!.textContent = text
    }
}

export function updateWeatherElements(data: WeatherData) {
    updateElementTextById('weather-date', `Data: ${new Date(data.date).toLocaleString()}`)
    updateElementTextById('weather-temperature', `Temperatūra: ${data.temperature}°C`)
    updateElementTextById('weather-humidity', `Drėgmė: ${data.humidity}%`)
    updateElementTextById('weather-preassure', `Slėgis: ${data.preassure} hPa`)
    updateElementTextById('weather-pm', `PM: ${data.pm}`)
}

async function updateWeather() {
    const weatherReport = await fetchWeather()
    if (weatherReport.data && weatherReport.data.length > 0) {
        const latestWeatherData = weatherReport.data[0]
        updateWeatherElements(latestWeatherData)
    }
}

export async function initializeWeather() {

    await updateWeather()
    setInterval(updateWeather, 60000)
}