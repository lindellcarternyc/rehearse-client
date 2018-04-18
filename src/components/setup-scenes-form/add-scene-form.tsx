import * as React from 'react'

// Components
import {
  Button,
  Header,
  Segment
} from 'semantic-ui-react'

import AddCharactersDropdown from './add-characters-dropdown'

// Types
// import { IScene } from '../../types'
interface IAddSceneFormProps {
  title: string
  allCharacters: string[]
  onChange: (title: string, selectedCharacters: string[]) => void
}
interface IAddSceneFormState {
  selectedCharacters: string[]
  editing: boolean
}
class AddSceneForm extends React.Component<IAddSceneFormProps, IAddSceneFormState> {
  constructor(props: IAddSceneFormProps) {
    super(props)

    this.state = { 
      editing: false,
      selectedCharacters: [ ]
    }
  }

  public render() {
    const { selectedCharacters } = this.state
    const buttonText = selectedCharacters.length === 0
      ? 'Add Characters' : 'Edit Characters'
    const { title } = this.props
    const { editing } = this.state
    return (
      <Segment>
        <Header as='h4' content={title} />
        {!editing &&
          <>
            <Button 
              content={buttonText}
              disabled={editing} 
              onClick={this.startEditing} 
            />
            <div>{selectedCharacters.join(', ')}</div>
          </>
        }
        {editing && 
          <AddCharactersDropdown 
            allCharacters={this.props.allCharacters}
            onChange={this.updateCharaters}
            onClose={this.closeDropdown}
            selectedCharacters={selectedCharacters}
          />
        }
      </Segment>
    )
  }

  private startEditing = () => {
    this.setState({ editing: true })
  }

  private updateCharaters = (characters: string[]) => {
    this.setState({ selectedCharacters: characters }, () => {
      this.props.onChange(this.props.title, this.state.selectedCharacters)
    })
  }

  private closeDropdown = () => {
    this.setState({ editing: false })
  }
}

export default AddSceneForm