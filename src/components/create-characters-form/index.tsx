import * as React from 'react'

// Components
import { 
  Form, FormButton, FormGroup,
  FormInput,
  Header,
  Message
} from 'semantic-ui-react'

import CharacterList from '../character-list'

// Types
interface ICreateCharactersFormProps {
  createCharacters: (characters: string[]) => void
}
interface ICreateCharactersFormState {
  characters: string[]
  newCharacter: string
}
class CreateCharactersForm extends React.Component<ICreateCharactersFormProps, ICreateCharactersFormState> {
  constructor(props: ICreateCharactersFormProps) {
    super(props)

    this.state = { 
      characters: [],
      newCharacter: ''
    }
  }
  public render() {
    const hasError = this._containsNewCharacter
    return (
      <>
        <Form error={hasError}>
          <FormInput 
            label="Name" type="text" 
            name="name"
            value={this.state.newCharacter}
            onChange={this.onChange}
          />
          {hasError && 
            <Message error header="Whoops" content={`${this.state.newCharacter} is already in the list.`}/>
          }
          <FormGroup inline>
            <FormButton content="Add Character" 
              disabled={!this._newCharacterIsValid}
              onClick={this.addCharacter}
            />
            <FormButton content="Clear" onClick={this.resetNewCharacter}/>
          </FormGroup>
          <Header as='h4' content='Characters' />
          <CharacterList 
            characters={this.state.characters} 
            action={{callback: this.removeCharacter, text: 'Delete'}}
          />
          <FormGroup inline>
            <FormButton 
              content='Create Characters' 
              onClick={this.createCharacters}
              disabled={!this._isValid}
            />
            <FormButton content='Clear list'onClick={this.resetForm}/>
          </FormGroup>
        </Form>
        
      </>
    )
  }

  private onChange = (evt: React.SyntheticEvent<HTMLInputElement>, data: { value: string }) => {
    const newCharacter = data.value
    this.setState({newCharacter})
  }

  private resetNewCharacter = () => {
    this.setState({newCharacter: ''})
  }

  private resetForm = () => {
    this.setState({
      characters: [],
      newCharacter: ''
    })
  }

  private createCharacters = (evt: React.SyntheticEvent<HTMLButtonElement | HTMLFormElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    const { characters } = this.state
    this.props.createCharacters(characters)
  }

  private get _newCharacterIsValid(): boolean {
    const { newCharacter } = this.state
    return newCharacter.length >= 1 && !this._containsNewCharacter
  }

  private get _containsNewCharacter(): boolean {
    const { characters, newCharacter } = this.state
    if ( characters.find( c => c === newCharacter.trim() ) !== undefined) {
      return true
    } return false
  }

  private addCharacter = () => {
    if ( this._newCharacterIsValid ) {
      this.setState(({ characters, newCharacter }) => {
        return {
          characters: characters.concat(newCharacter.trim()),
          newCharacter: ''
        }
      })
    }
  }

  private removeCharacter = (name: string) => {
    this.setState(({ characters }) => {
      return {
        characters: characters.filter(character => character !== name)
      }
    })
  }

  private get _isValid(): boolean {
    return this.state.characters.length > 0
  }
}

export default CreateCharactersForm