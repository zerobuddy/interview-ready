import dayjs from "dayjs";
import { normalizeAndFilter } from "./holidayNormalizer";
import isBetween from "dayjs/plugin/isBetween";

const API_BASE = "https://date.nager.at/api/v3";

// 🔒 In-memory cache
const holidayCache = new Map();

export async function fetchRollingHolidays(countryCode = "US") {
    const cacheKey = countryCode;

    // ✅ Return cached result if present
    if (holidayCache.has(cacheKey)) {
        return holidayCache.get(cacheKey);
    }

    const now = dayjs();
    const years = [
        now.subtract(1, "year").year(),
        now.year(),
        now.add(1, "year").year(),
    ];

    const responses = await Promise.all(
        years.map((year) =>
            fetch(`${API_BASE}/PublicHolidays/${year}/${countryCode}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Holiday API failed");
                    return res.json();
                })
        )
    );

    const normalized = normalizeAndFilter(responses.flat());

    // ✅ Cache normalized result
    holidayCache.set(cacheKey, normalized);

    return normalized;
}
