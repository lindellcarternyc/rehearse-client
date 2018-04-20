import * as React from 'react'

// Components
import { 
  Button,
  Header,
  Segment
} from 'semantic-ui-react'

// Types
import { IScheduleItem } from '../../../types'
interface IPreviewItemProps {
  item: IScheduleItem
  onClickEdit: (id: string) => void
  onClickDelete: (id: string) => void
}

const ItemPreview = (props: IPreviewItemProps) => {
  const { item } = props
  const { startTime, endTime, characters, material } = item

  const onClickEdit = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    props.onClickEdit(item.id)
  }

  const onClickDelete = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    props.onClickDelete(item.id)
  }
  return (
    <Segment>
      <Header as='h4' content={`${startTime} - ${endTime}: ${material}`} />
      {characters[0] === 'Tutti'
        ? 'Tutti called'
        : `${characters.length} people called.`
      }
      <br />
      <Button content='Edit' onClick={onClickEdit} />
      <Button content='Delete' onClick={onClickDelete} />
    </Segment>
  )
}

export default ItemPreview