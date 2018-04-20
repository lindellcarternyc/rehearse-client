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

// Connections
import { Database } from '../../../mock/database'

interface ICreateEditItemProps {
  mode: 'Create' | 'Edit'
  acts: IActs
  database: Database
  cancel: () => void
}

interface ICreateItemProps extends ICreateEditItemProps {
  id: string
  mode: 'Create'
  createItem: (item: IScheduleItem) => void
}
interface IEditItemProps extends ICreateEditItemProps {
  mode: 'Edit'
  item: IScheduleItem
  editItem: (item: IScheduleItem) => void
}

type CreateEditItemProps = ICreateItemProps | IEditItemProps
// type ICreateEditItemProps = ICreateItemProps | IEditItemProps
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
    if ( this.props.mode === 'Create' ) {
      this.setState({
        characters: [],
        endTime: '',
        id: this.props.id,
        material: '',
        startTime: ''
      })
    } else if ( this.props.mode === 'Edit' ) {
      this.setState({
        ...this.props.item
      })
    }
  }

  public render() {
    return(
      <Segment>
        <Header as='h4' content={this.props.mode + ' Item'}/>
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
    this.getCharactersForMaterial(material)
      .then(characters => {
        this.setState({ material, characters })
      })
      .catch(err => {
        throw err
      })
  }

  private getCharactersForMaterial(material: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if ( material === 'Run Opera') {
        resolve(['Tutti'])
      } else if ( material.slice(0, 7) === 'Run Act') {
        const actTitle = material.slice(4)
        this.props.database.getCharactersForAct(actTitle)
          .then(characters => {
            resolve(characters)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        this.props.database.getCharactersForScene(material)
          .then(characters => { resolve(characters)})
          .catch(err => { throw err })
      }
    })
  }

  private reset = () => {
    if ( this.props.mode === 'Create' ) {
      this.setState({
        characters: [],
        endTime: '',
        material: '',
        startTime: '',
      })
    } else if ( this.props.mode === 'Edit') {
      this.setState({
        ...this.props.item
      })
    }
  }

  private get isValid(): boolean {
    const { startTime, endTime, material, characters } = this.state
    return startTime !== '' && endTime !== '' && material !== '' && characters.length > 0
  }

  private save = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    if ( this.props.mode === 'Create' ) {
      this.props.createItem(this.state)
    } else if ( this.props.mode === 'Edit' ) {
      this.props.editItem(this.state)
    }
  }
}

export default CreateEditItem