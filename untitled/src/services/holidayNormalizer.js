import dayjs from "dayjs";
import { isWorkHoliday } from "./holidayPriority";

export function normalizeAndFilter(apiData) {
    const start = dayjs().subtract(11, "month");
    const end = dayjs().add(11, "month");

    const byDate = new Map();

    apiData.forEach((h) => {
        const dateObj = dayjs(h.date);

        // ✅ plugin-free range check
        if (dateObj.isBefore(start, "day") || dateObj.isAfter(end, "day")) return;

        const dateKey = h.date;
        const workHoliday = isWorkHoliday(h.types);

        const normalized = {
            date: h.date,
            name: h.localName || h.name,
            isWorkHoliday: workHoliday,
            types: h.types,
            global: h.global,
        };

        if (!byDate.has(dateKey)) {
            byDate.set(dateKey, normalized);
            return;
        }

        const existing = byDate.get(dateKey);

        // ⭐ priority rule
        if (!existing.isWorkHoliday && workHoliday) {
            byDate.set(dateKey, normalized);
        }
    });

    return Array.from(byDate.values()).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
}
