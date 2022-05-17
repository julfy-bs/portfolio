export const formatDate = (date: string): string => {
  const dateValue = new Date(date)
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return `${month[dateValue.getMonth()]} ${dateValue.getDate()}, ${dateValue.getFullYear()}`
}
