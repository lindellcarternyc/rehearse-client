import * as React from 'react'

// Components
import {
  Button,
  List
} from 'semantic-ui-react'

// Types
interface ICharacterListItemProps {
  name: string
  action?: {
    text: string,
    callback: () => void
  }
}

const CharacterListItem = (props: ICharacterListItemProps): JSX.Element => {
  return (
    <List.Item>
      <List.Content content={props.name} />
      {props.action !== undefined &&
        <List.Content floated='right'>
          <Button content={props.action.text} onClick={props.action.callback} />
        </List.Content>
      }
    </List.Item>
  )
}

export default CharacterListItem