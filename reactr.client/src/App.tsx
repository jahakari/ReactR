import { useEffect, useState } from 'react';
import './App.css';
import Badge from './components/Badge';
import Forecast from './Forecast';
import Calendar from './components/Calendar/Calendar';
import CalendarCell from './components/Calendar/CalendarCell';
import FlashyCard from "./components/FlashyCard/FlashyCard";

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [isLoading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>
                            <Badge theme={forecast.summary.theme} text={forecast.summary.description} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="row justify-content-center">
            <div className="col-sm-6">
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <div className="d-flex mt-3 align-items-center">
                    <button type="button" className="btn btn-sm btn-success" disabled={isLoading} onClick={populateWeatherData}>
                        Refresh
                    </button>
                    {isLoading && <div className="spinner-border spinner-border-sm ms-2 text-primary"></div>}
                </div>
            </div>
            <div className="col-sm-3">
                <Calendar month={4} year={2024} onCellClicked={cellClicked} refreshOnCellClick={true} cellModifier={cellModifier} />
            </div>
            <div className="col-sm-3">
                <FlashyCard />
            </div>
        </div>
    );

    async function populateWeatherData() {
        setLoading(true);

        const response = await fetch("weatherforecast");
        const data = await response.json();

        setForecasts(data);
        setLoading(false);
    }

    function cellModifier(cell: CalendarCell) {
        cell.isSelected = cell.date.getTime() == selectedDate.getTime();
    }

    function cellClicked(cell: CalendarCell) {
        setSelectedDate(cell.date);
        console.log(`Cell Clicked: ${selectedDate}`);
    }
}

export default App;