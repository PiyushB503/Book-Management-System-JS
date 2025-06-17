export function filterItems<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

export function sortItems<T>(
  items: T[],
  compareFn: (a: T, b: T) => number
): T[] {
  return [...items].sort(compareFn);
}

export function findItem<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return items.find(predicate);
}
