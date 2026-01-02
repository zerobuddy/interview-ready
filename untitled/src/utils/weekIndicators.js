import dayjs from "dayjs";

/**
 * Returns:
 * {
 *   "2026-04-06": { count: 1 },  // week starting date (Sunday or Monday)
 *   "2026-12-21": { count: 2 }
 * }
 */
export function buildWeekIndicators(holidays) {
    const weekMap = new Map();

    holidays.forEach((h) => {
        if (!h.isWorkHoliday) return;

        const weekStart = dayjs(h.date).startOf("week").format("YYYY-MM-DD");

        weekMap.set(
            weekStart,
            (weekMap.get(weekStart) || 0) + 1
        );
    });

    return weekMap;
}
