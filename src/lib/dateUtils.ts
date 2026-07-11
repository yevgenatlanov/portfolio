import { experiences } from "@/data/exp";

const monthMap: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, june: 5,
  jun: 5, july: 6, jul: 6, aug: 7, sept: 8, sep: 8,
  oct: 9, nov: 10, dec: 11,
};

function parseDateString(dateStr: string): Date {
  const normalized = dateStr.trim().toLowerCase();

  if (normalized === "present") {
    // Use a stable date within the current year to avoid SSR/client hydration mismatches.
    return new Date(new Date().getFullYear(), 11, 31);
  }

  // Year only, e.g. "2011"
  if (/^\d{4}$/.test(normalized)) {
    return new Date(parseInt(normalized, 10), 0, 1);
  }

  // Month Year, e.g. "May 2024" or "Sept 2023"
  const parts = normalized.split(/\s+/);
  if (parts.length === 2) {
    const monthName = parts[0].replace(/[^a-z]/g, "");
    const year = parseInt(parts[1], 10);
    const month = monthMap[monthName];
    if (month !== undefined && !Number.isNaN(year)) {
      return new Date(year, month, 1);
    }
  }

  return new Date(normalized);
}

export function getExperienceDates() {
  return experiences.map((exp) => {
    const start = parseDateString(exp.startDate);
    const end = parseDateString(exp.endDate);
    const durationMs = end.getTime() - start.getTime();
    const durationMonths = Math.max(1, Math.round(durationMs / (1000 * 60 * 60 * 24 * 30.44)));
    const durationYears = durationMonths / 12;

    return {
      ...exp,
      start,
      end,
      durationMonths,
      durationYears,
    };
  });
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}

export function getTotalRange() {
  const dated = getExperienceDates();
  const min = Math.min(...dated.map((d) => d.start.getTime()));
  const max = Math.max(...dated.map((d) => d.end.getTime()));
  return { min, max, totalMs: max - min };
}
