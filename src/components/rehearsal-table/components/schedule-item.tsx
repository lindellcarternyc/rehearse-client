import * as React from 'react'

// Components
import { TableCell } from 'semantic-ui-react'

// Types
import { IRehearsalScheduleItem } from '../../../types'

const ScheduleItem = (props: IRehearsalScheduleItem): JSX.Element => {
  const { startTime, endTime, material, people } = props
  return (
    <>
      <TableCell>{startTime} - {endTime}</TableCell>
      <TableCell>{material.join('\n')}</TableCell>
      <TableCell>{people.join(', ')}</TableCell>
    </>
  )
}

export default ScheduleItem