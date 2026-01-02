import dayjs from "dayjs";

export default function MonthView({ month, today, weekIndicators }) {
    const start = month.startOf("month").startOf("week");
    const end = month.endOf("month").endOf("week");

    const days = [];
    let d = start;

    while (d.isBefore(end)) {
        days.push(d);
        d = d.add(1, "day");
    }

    return (
        <div className="month">
            <div className="month-title">{month.format("MMM")}</div>

            <div className="weekdays">
                {["S", "M", "T", "W", "T", "F", "S"].map((w) => (
                    <span key={w}>{w}</span>
                ))}
            </div>

            <div className="days">
                {days.map((date) => {
                    const isCurrentMonth = date.month() === month.month();
                    const isToday = date.isSame(today, "day");

                    const weekKey = date.startOf("week").format("YYYY-MM-DD");
                    const workHolidayCount = weekIndicators?.get(weekKey) || 0;

                    return (
                        <span
                            key={date.toString()}
                            className={`day
                ${!isCurrentMonth ? "muted" : ""}
                ${isToday ? "today" : ""}
                ${workHolidayCount === 1 ? "week-single" : ""}
                ${workHolidayCount > 1 ? "week-multiple" : ""}
              `}
                        >
              {date.date()}
            </span>
                    );
                })}
            </div>
        </div>
    );
}
