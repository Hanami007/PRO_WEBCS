import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToOrdinalWord(n: number): string {
  const words: Record<number, string> = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
    7: "Seventh",
    8: "Eighth",
    9: "Ninth",
    10: "Tenth",
  };

  return words[n] ?? `${n}th`;
}

export function groupBy<T>(array: T[], keyGetter: (item: T) => string) {
  return array.reduce(
    (map, item) => {
      const key = keyGetter(item);

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(item);
      return map;
    },
    {} as Record<string, T[]>,
  );
}

export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
