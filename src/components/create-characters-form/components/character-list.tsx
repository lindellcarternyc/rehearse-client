import * as React from 'react'

// Components
import { 
  Button,
  List, ListContent, ListItem
} from 'semantic-ui-react'

interface ICharacterListItemProps {
  name: string
  onClick: () => void
}
const CharacterListItem = (props: ICharacterListItemProps): JSX.Element => {
  return (
    <ListItem key={props.name}>
      <ListContent>{props.name}</ListContent>
      <ListContent floated='right'>
        <Button content="Remove" onClick={props.onClick} />
      </ListContent>
    </ListItem>
  )
}

interface ICharacterListProps {
  characters: string[]
  removeCharacter: (name: string) => void
}
const CharacterList = (props: ICharacterListProps): JSX.Element => {
  const onClick = (name: string) => () => {
    props.removeCharacter(name)
  }
  return (
    <List verticalAlign='middle' bulleted>
      {props.characters.map(character => {
        return (
          <CharacterListItem key={character} name={character} onClick={onClick(character)} />
        )
      })}
    </List>
  )
}

export default CharacterList