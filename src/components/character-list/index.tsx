import * as React from 'react'

// Components
import {
  List
} from 'semantic-ui-react'

import CharacterListItem from './components/character-list-item'

interface ICharacterListProps {
  characters: string[]
  action?: {
    text: string
    callback: (name: string) => void
  }
}

const CharacterList = (props: ICharacterListProps): JSX.Element => {
  return (
    <List>
      {props.characters.map(character => {
        let action: {callback: (() => void), text: string} | undefined
        if (props.action !== undefined) {
          action ={callback: () => {
            props.action!.callback(character)
          }, text: props.action.text}
        } else {
          action = undefined
        }
        return (
          <CharacterListItem key={character} name={character} action={action}/>
        )
      })}
    </List>
  )
}

export default CharacterList