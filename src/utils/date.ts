import moment from 'moment'
export function calculateRelativeTime(startDate: Date, endDate: Date) {
  const duration = moment.duration(endDate.getTime() - startDate.getTime())
  return duration.humanize()
}
