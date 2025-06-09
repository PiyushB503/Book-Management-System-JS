"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterItems = filterItems;
exports.sortItems = sortItems;
exports.findItem = findItem;
function filterItems(items, predicate) {
    return items.filter(predicate);
}
function sortItems(items, compareFn) {
    return [...items].sort(compareFn);
}
function findItem(items, predicate) {
    return items.find(predicate);
}
