import { useState } from "react";
import dayjs from "dayjs";
import MonthView from "./MonthView";
import { buildWeekIndicators } from "../utils/weekIndicators";

export default function CalendarThreeMonth() {
    const [baseMonth, setBaseMonth] = useState(dayjs());

    const months = [
        baseMonth.subtract(1, "month"),
        baseMonth,
        baseMonth.add(1, "month"),
    ];

    return (
        <div className="calendar-root">
            <div className="nav">
                <button onClick={() => setBaseMonth(baseMonth.subtract(1, "month"))}>
                    ‹
                </button>
                <span>{baseMonth.format("MMMM YYYY")}</span>
                <button onClick={() => setBaseMonth(baseMonth.add(1, "month"))}>
                    ›
                </button>
            </div>

            <div className="months">
                {months.map((m) => (
                    <MonthView
                        key={m.format("YYYY-MM")}
                        month={m}
                        today={dayjs()}

                    />
                ))}
            </div>
        </div>
    );
}
