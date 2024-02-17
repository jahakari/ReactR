
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: ForecastSummary;
}

interface ForecastSummary {
    description: string,
    theme: string
}

export default Forecast;