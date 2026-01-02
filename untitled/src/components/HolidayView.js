import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchRollingHolidays } from "../services/holidayService";

export default function HolidayView({ country = "US" }) {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchRollingHolidays(country)
            .then(setHolidays)
            .catch((err) => {
                console.error("Holiday fetch failed:", err);
                setError("Failed to load holidays");
            })
            .finally(() => setLoading(false));
    }, [country]);

    if (loading) return <div className="panel">Loading holidays…</div>;
    if (error) return <div className="panel error">{error}</div>;

    return (
        <div className="panel">
            <h4>Holidays (±11 months)</h4>

            <ul className="holiday-list">
                {holidays.map((h) => (
                    <li
                        key={h.date} /* ✅ one holiday per date */
                        className={
                            h.isWorkHoliday
                                ? "holiday work-holiday"
                                : "holiday regular-holiday"
                        }
                    >
                        <span>{dayjs(h.date).format("DD MMM YYYY")}</span>
                        <strong>{h.name}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}
