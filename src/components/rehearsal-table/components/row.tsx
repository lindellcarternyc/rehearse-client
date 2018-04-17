import * as React from 'react'

// Components
import { TableCell, TableRow } from 'semantic-ui-react'

import ScheduleItem from './schedule-item'

// Types
import { IRehearsal } from '../../../types'

interface IRehearsalTableRowProps {
  rehearsal: IRehearsal
}
const RehearsalTableRow = (props: IRehearsalTableRowProps): JSX.Element => {
  const { rehearsal } = props
  const { date, location, schedule, conflicts, notes } = rehearsal
  const [firstItem, ...otherItems] = schedule
  return (
    <>
      <TableRow>
        <TableCell rowSpan={schedule.length}>{date}</TableCell>
        <TableCell rowSpan={schedule.length}>{location}</TableCell>
        <ScheduleItem {...firstItem} />
        {conflicts !== undefined && 
          <TableCell>{conflicts.join('\n')}</TableCell>
        }
        {notes !== undefined &&
          <TableCell>{notes.join('\n')}</TableCell>
        }
      </TableRow>
      {otherItems.map(item => {
        const key = JSON.stringify(item)
        return (
          <TableRow key={key}>
            <ScheduleItem {...item} />
          </TableRow>
        )
      })}
    </>
  )
}

export default RehearsalTableRow