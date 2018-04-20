// External modules
import * as moment from 'moment'

// Types
import { IRehearsal, ISchedule } from './types'

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

/**
 * 
 * @param rehearsal IReharsal with date and times formatted from form inputs
 * @returns IRehearsal formatted for display
 */
export const formatRehearsal = (rehearsal: IRehearsal): IRehearsal => {
  const date = formatDate(rehearsal.date)
  // const schedule = Object.keys(rehearsal.schedule).map(id => {
  //   const item = rehearsal.schedule[id]

  //   return {
  //     ...item,
  //     endTime: formatTime(item.endTime),
  //     startTime: formatTime(item.startTime),
  //   }
  // })

  const schedule = Object.keys(rehearsal.schedule).reduce<ISchedule>(
    (prevSchedule, currId) => {
      const item = rehearsal.schedule[currId]
      return { 
        ...prevSchedule,
        [item.id]: {
          ...item,
          endTime: formatTime(item.endTime),
          startTime: formatTime(item.startTime)
        }
      }
    }, {})

  return {
    ...rehearsal,
    date,
    schedule
  }
}

const s4 = (): string => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

export const guid = (): string => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}