import * as React from 'react'

// Components
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react'

import RehearsalTableRow from './components/row'

// Types
import { IRehearsal } from '../../types'

interface IRehearsalTableProps {
  rehearsals: IRehearsal[]
}
export const RehearsalTable = (props: IRehearsalTableProps): JSX.Element => {
  return (
    <Table celled structured>
      <TableHeader>
        <TableRow>
          <TableHeaderCell rowSpan='2'>Date</TableHeaderCell>
          <TableHeaderCell rowSpan='2'>Location</TableHeaderCell>
          <TableHeaderCell colSpan='3'>Schedule</TableHeaderCell>
          <TableHeaderCell rowSpan='2'>Conflicts</TableHeaderCell>
          <TableHeaderCell rowSpan='2'>Notes</TableHeaderCell>
        </TableRow>
        <TableRow>
          <TableHeaderCell>Times</TableHeaderCell>
          <TableHeaderCell>Material</TableHeaderCell>
          <TableHeaderCell>People</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.rehearsals.map(rehearsal => {
          const key = JSON.stringify(rehearsal)
          return (
            <RehearsalTableRow key={key} rehearsal={rehearsal} />
          )
        })}
      </TableBody>
    </Table>
  )
}

export default RehearsalTable