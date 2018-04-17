import * as moment from 'moment'

/**
 * @param time A string in the format 'hh:mm' in 24 hour time
 * @returns A string in the format 'hh:mm (A|P)M' 12 hour time
 */
export const formatTime = (time: string): string => {
  let suffix: 'AM' | 'PM' = 'AM'
  const components = time.split(':')
    let hh = parseInt(components[0], 10)
    if ( hh >= 13 ) { 
      hh -= 12
      suffix = 'PM'
    } else if ( hh === 0 ) {
      hh = 12
    }
    return `${hh}:${components[1]} ${suffix}`
}

/**
 * 
 * @param date string in format YYYY-mm-dd
 * @returns string in format Weekday, Month date
 */
export const formatDate = (date: string): string => {
  return moment(date, 'YYYY-MM-DD')
          .format('dddd, MMMM D')
}