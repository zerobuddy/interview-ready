export const WORK_HOLIDAY_TYPES = new Set([
    "Public",
    "Authorities",
    "School",
]);

export function isWorkHoliday(types = []) {
    return types.some((t) => WORK_HOLIDAY_TYPES.has(t));
}
