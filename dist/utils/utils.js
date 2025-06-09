export function filterItems(items, predicate) {
    return items.filter(predicate);
}
export function sortItems(items, compareFn) {
    return [...items].sort(compareFn);
}
export function findItem(items, predicate) {
    return items.find(predicate);
}
