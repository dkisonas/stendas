export interface WeatherData {
    code: string;
    date: string;
    temperature: string;
    humidity: string;
    preassure: string;
    pm: string;
}

export interface WeatherReport {
    data: WeatherData[];
}