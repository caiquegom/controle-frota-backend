import { format } from "date-fns"

export const formatTimeForDatabase = (value: Date) => {
  return format(value, 'yyyy-MM-dd  03:00:00.000000')
}