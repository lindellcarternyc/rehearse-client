import * as React from 'react'

// Components
import { Button, Dropdown } from 'semantic-ui-react'

interface IOption {
  key: string
  value: string
  text: string
}
const optionsForCharacters = (characters: string[]): IOption[] => {
  return characters.map(character => {
    return {
      key: character,
      text: character,
      value: character
    }
  })
}

interface IAddCharactersDropdownProps {
  allCharacters: string[]
  onChange: (charachters: string[]) => void
  onClose: () => void
  selectedCharacters: string[]
}

const AddCharactersDropdown = (props: IAddCharactersDropdownProps): JSX.Element => {
  const onChange = (evt: React.SyntheticEvent<HTMLElement>, data: { value: string[] }) => {
    const characters = data.value
    props.onChange(characters)
  }
  return (
    <>
      <Dropdown 
        fluid selection multiple
        options={optionsForCharacters(props.allCharacters)}  
        onChange={onChange}
        value={props.selectedCharacters}
      />
      <Button content='Done' onClick={props.onClose}/>
    </>
  )
}

export default AddCharactersDropdown