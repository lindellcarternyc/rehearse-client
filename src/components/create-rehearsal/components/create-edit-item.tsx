import * as React from 'react'

// Components
import {
  Button,
  FormGroup,
  FormInput,
  Header,
  Segment,
} from 'semantic-ui-react'

import SelectMaterialDropdown from './select-material-dropdown'

// Types
import { IActs, IScheduleItem } from '../../../types'

import { ICreateItemAction, IEditItemAction,  ItemActionType } from '../types'

interface ICreateEditItemProps {
  action?: ItemActionType
  acts: IActs
  cancel: () => void
}

interface ICreateItemProps extends ICreateEditItemProps {
  action: ICreateItemAction
  createItem: (item: IScheduleItem) => void
}
interface IEditItemProps extends ICreateEditItemProps {
  action: IEditItemAction
  editItem: (item: IScheduleItem) => void
}

type CreateEditItemProps = ICreateItemProps | IEditItemProps

interface ICreateEditItemState {
  id: string
  startTime: string
  endTime: string
  material: string
  characters: string[]
}
class CreateEditItem extends React.Component<CreateEditItemProps, ICreateEditItemState> {
  
  constructor(props: CreateEditItemProps) {
    super(props)

    this.state = {
      characters: [],
      endTime: '',
      id: '',
      material: '',
      startTime: '',
    }
  }

  public componentDidMount() {
    if ( this.props.action.mode === 'Create' ) {
      this.setState({
        characters: [],
        endTime: '',
        id: this.props.action.id,
        material: '',
        startTime: ''
      })
    } else if ( this.props.action.mode === 'Edit' ) {
      this.setState({
        ...this.props.action.item
      })
    }
  }

  public render() {
    return(
      <Segment>
        <Header as='h4' content={this.props.action.mode + ' Item'}/>
        <FormGroup inline>
          <Button content='Save' onClick={this.save} disabled={!this.isValid}/>
          <Button content='Reset' onClick={this.reset} />
          <Button content='Cancel' onClick={this.props.cancel}/>
        </FormGroup>
        <FormGroup widths='equal'>
          <FormInput type='time'
            name='startTime'
            value={this.state.startTime}
            onChange={this.onChange}
          />
          <FormInput type='time'
            name='endTime'
            value={this.state.endTime}
            onChange={this.onChange}
          />
        </FormGroup>
        <SelectMaterialDropdown 
          acts={this.props.acts}
          value={this.state.material}
          onChange={this.updateMaterial}
        />
      </Segment>
    )
  }

  private onChange = (evt: React.SyntheticEvent<HTMLInputElement>, data: { name: string, value: string }) => {
    const { name, value } = data
    if ( name === 'startTime') {
      this.setState({ startTime: value })
    } else if ( name === 'endTime') {
      this.setState({ endTime: value })
    }
  }

  private updateMaterial = (material: string) => {
    const characters = this.getCharactersForMaterial(material)
    this.setState({ material, characters })
  }

  private getCharactersForMaterial(material: string): string[]  {
    if ( material === 'Run Opera') {
      return ['Tutti']
    } else if ( material.slice(0, 7) === 'Run Act' ) {
      const actTitle = material.slice(4)
      const act = this.props.acts[actTitle]
      const scenes = act.scenes
      const characters = Object.keys(scenes).reduce<string[]>(
        (prevChars, currSceneId) => {
          const currScene = scenes[currSceneId]
          const currSceneCharacters = currScene.characters.filter(character => {
            return prevChars.indexOf(character) === -1
          })
          return [
            ...prevChars,
            ...currSceneCharacters
          ]
      }, [])
      return characters
    } else {
      const actTitle = material.split(', ')[0]
      const act = this.props.acts[actTitle]
      const scene = act.scenes[material]
      return scene.characters
    }
  }

  private reset = () => {
    if ( this.props.action.mode === 'Create' ) {
      this.setState({
        characters: [],
        endTime: '',
        material: '',
        startTime: '',
      })
    } else if ( this.props.action.mode === 'Edit') {
      this.setState({
        ...this.props.action.item
      })
    }
  }

  private get isValid(): boolean {
    const { startTime, endTime, material, characters } = this.state
    return startTime !== '' && endTime !== '' && material !== '' && characters.length > 0
  }

  private save = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    if ( this.props.action.mode === 'Create' ) {
      (this.props as ICreateItemProps).createItem(this.state)
    } else if ( this.props.action.mode === 'Edit' ) {
      (this.props as IEditItemProps).editItem(this.state)
    }
  }
}

export default CreateEditItem