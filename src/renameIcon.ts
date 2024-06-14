/// Get the new name for an icon if it has been used
export function renameIcon(iconName: string, categoryName: string): string {
  return `${iconName} ${categoryName}`;
}
