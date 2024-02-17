import CalendarCell from "./CalendarCell";

export type CalendarProps = {
    month: number,
    year: number,
    refreshOnCellClick?: boolean,
    cellModifier?: (cell: CalendarCell) => void,
    onCellClicked?: (cell: CalendarCell) => void
}

export default CalendarProps;