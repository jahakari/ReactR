import { useEffect, useState } from "react";
import "./Calendar.css";
import CalendarProps from "./CalendarProps";
import CalendarCell from "./CalendarCell";
import "../../extensions/date.extensions";

const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays: string[] = ["S", "M", "T", "W", "T", "F", "S"];

function Calendar(props: CalendarProps) {
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    const [cells, setCells] = useState<CalendarCell[]>([]);

    useEffect(generateCells, [month, year]);

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="calendar-header-left">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => offsetMonth(-1)}>
                        &lt;
                    </button>
                </div>
                <div className="calendar-header-center">
                    {months[month]} {year}
                </div>
                <div className="calendar-header-right">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => offsetMonth(1)}>
                        &gt;
                    </button>
                </div>
            </div>
            <div className="calendar-weekdays">
                {weekdays.map((d, i) =>
                    <div className="calendar-weekday-cell" key={i}>
                        {d}
                    </div>
                )}
            </div>
            <div className="calendar-cells">
                {cells.map(c =>
                    <div className={c.cellClassList} key={c.date.toString()} onClick={() => cellClicked(c)}>
                        {c.dayOfMonth}
                    </div>
                )}
            </div>
        </div>
    );

    function offsetMonth(offset: number) {
        setMonth(oldMonth => {
            let newMonth = oldMonth + offset;

            if (newMonth < 0) {
                setYear(oldYear => oldYear - 1);
                return 11;
            }

            if (newMonth > 11) {
                setYear(oldYear => oldYear + 1);
                return 0;
            }

            return newMonth;
        });
    }

    function generateCells() {
        let date = new Date(year, month);
        let days = date.getDay();

        date = date.addDays(-days);

        let end = new Date(year, month).endOfMonth();

        days = end.getDay();
        days = 6 - days;

        end = end.addDays(days);
        let cells: CalendarCell[] = [];

        for (; date <= end; date = date.addDays(1)) {
            let cell = new CalendarCell(date, month);
            cell.isClickable = !!props.onCellClicked;

            updateCell(cell);
            cells.push(cell);
        }

        setCells(cells);
    }

    function updateCell(cell: CalendarCell) {
        props.cellModifier?.(cell);
    }

    function cellClicked(cell: CalendarCell) {
        if (!props.onCellClicked) {
            return;
        }

        props.onCellClicked(cell);

        if (props.refreshOnCellClick) {
            refresh();
        }
    }

    function refresh() {
        setCells(c => {
            c.forEach(updateCell)
            return [...c];
        });
    }
}

export default Calendar;