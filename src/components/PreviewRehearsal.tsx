import * as React from 'react'

// utils
import { formatRehearsal } from '../utils'

// Components
import { 
  Header,
  List,
  Segment
} from 'semantic-ui-react'

// Types
import { IRehearsal } from '../types'

type PreviewRehearsalProps = IRehearsal
const PreviewRehearsal = (props: PreviewRehearsalProps): JSX.Element => {
  const rehearsal = formatRehearsal(props)
  return (
    <Segment>
      <Header as='h2' content={rehearsal.date} subheader={rehearsal.location} />
      <List>
        {Object.keys(rehearsal.schedule).map(id => {
          const item = rehearsal.schedule[id]
          return <List.Item key={item.id} content={
            `${item.startTime} - ${item.endTime}: ${item.material}`
          }/>
        })}
      </List>
    </Segment>
  )
}

export default PreviewRehearsal