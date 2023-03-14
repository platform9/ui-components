export function defaultItemToString(item): string {
  return item ? item.label ?? (item.value ? String(item.value) : null) : null
}
