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
import { Database } from '../../../mock/database'
import { IActs, IScheduleItem } from '../../../types'

interface ICreateRehearsalItemProps {
  acts: IActs
  database: Database
  onSave: (item: IScheduleItem) => void
}
interface ICreateRehearsalItemState extends IScheduleItem {
  isCurrentlyEditing: boolean
}

class CreateRehearsalItem extends React.Component<ICreateRehearsalItemProps, ICreateRehearsalItemState> {
  private static itemId = 0

  private static newItem(): IScheduleItem {
    return {
      characters: [],
      endTime: '',
      id: CreateRehearsalItem.itemId.toString(10),
      material: '',
      startTime: ''
    }
  }

  private static initialState(): ICreateRehearsalItemState {
    return {
      ...CreateRehearsalItem.newItem(),
      isCurrentlyEditing: false
    }
  }
  constructor(props: ICreateRehearsalItemProps) {
    super(props)

    this.state = {
      ...CreateRehearsalItem.initialState()
    }
  }

  public render() {
    return (
      <Segment>
        {!this.state.isCurrentlyEditing &&
          <Button content='New Item' onClick={this.startEditing}/>
        }
        {this.state.isCurrentlyEditing &&
          <>
            <Header as='h4' content='New Item'/>
            <FormGroup inline>
              <Button content='Save' disabled={!this.isValid} onClick={this.onSave}/>
              <Button content='Clear' onClick={this.reset} />
              <Button content='Cancel' onClick={this.cancel} />
            </FormGroup>
            <FormGroup widths='equal'>
              <FormInput 
                label='Start time' value={this.state.startTime}
                onChange={this.onChange}
                type='time' name='startTime'
              />
              <FormInput 
                label='End time' name='endTime' min={this.state.startTime}
                value={this.state.endTime} onChange={this.onChange}
                type='time'
              />
            </FormGroup>
            <SelectMaterialDropdown 
              acts={this.props.acts} 
              value={this.state.material}
              onChange={this.updateMaterial}
            />
          </>
        }
      </Segment>
    )
  }

  private onChange = (evt: React.SyntheticEvent<HTMLElement>, data: { name: string, value: string }) => {
    evt.preventDefault()
    evt.stopPropagation()

    const { name, value } = data
    if ( name === 'startTime' ) {
      this.setState({ startTime: value })
    } else if ( name === 'endTime' ) {
      this.setState({ endTime: value })
    }
  }

  private updateMaterial = (material: string) => {
    this.getCharactersForMaterial(material)
      .then(characters => {
        this.setState({ material, characters})
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

  private startEditing = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({ isCurrentlyEditing: true })
  }

  private get isValid(): boolean {
    const { startTime, endTime, material, characters } = this.state
    return startTime !== '' && endTime !== '' && material !== '' && characters.length > 0
  }

  private onSave = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    const { isCurrentlyEditing, ...item } = this.state
    this.setState(() => {
      CreateRehearsalItem.itemId++
      return { ...CreateRehearsalItem.initialState() }
    }, () => {
      this.props.onSave(item)
    })
  }

  private reset = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    this.setState({ ...CreateRehearsalItem.newItem() })
  }

  private cancel = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    this.setState({ ...CreateRehearsalItem.initialState() })
  }
}

export default CreateRehearsalItem