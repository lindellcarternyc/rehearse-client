import * as React from 'react'

// Utils
import { guid } from '../../utils'

// Components
import { 
  Button,
  Form, FormGroup, FormInput,
  Header
} from 'semantic-ui-react'

import CreateEditItem from './components/create-edit-item'
import ItemPreview from './components/ItemPreview'

// Types
import { Database } from '../../mock/database'
import { IAct, IRehearsal, ISchedule, IScheduleItem } from '../../types'

interface ICreateRehearsalProps {
  acts: { [key: string]: IAct }
  database: Database
  onSubmit: (newRehearsal: IRehearsal) => void
}
interface ICreateRehearsalState {
  date: string
  location: string
  schedule: ISchedule
  itemAction?: 'Create' | { id: string }
}
class CreateRehearsal extends React.Component<ICreateRehearsalProps, ICreateRehearsalState> {
  private static newItemId: string = guid()
  constructor(props: ICreateRehearsalProps) {
    super(props)

    this.state = {
      date: '',
      location: '',
      schedule: { }
    }
  }
  public render() {
    return (
      <>
        <Form>
          <FormInput 
            label='Date' 
            type='date'
            name='date'
            onChange={this.onChangeInput}
            value={this.state.date}
          />
          <FormInput 
            label='Location'
            type='text'
            name='location'
            onChange={this.onChangeInput}
            value={this.state.location}
          />
          {this.renderPreviews()}
          {this.renderItemAction()}
          <br />
          <FormGroup inline>
            <Button content='Save Rehearsal' disabled={!this.isValid} onClick={this.onClickSaveRehearsal}/>
            <Button content='Reset' onClick={this.reset}/>
            <Button content='Cancel' />
          </FormGroup>
        </Form>
      </>
    )
  }

  // Render helpers
  private renderItemAction() {
    const { itemAction } = this.state
    if ( itemAction === undefined ) {
      return (
        <div><Button content='New Item' onClick={this.onClickNewItem}/></div>
      )
    } else if ( itemAction === 'Create' ) {
      return (
        <CreateEditItem 
          mode='Create'
          id={CreateRehearsal.newItemId}
          createItem={this.createItem}
          acts={this.props.acts}
          database={this.props.database}
          cancel={this.onClickCancelItemAction}
        />
      )
    } else {
      const { id } = itemAction
      const item = this.state.schedule[id]
      return (
        <CreateEditItem 
          mode='Edit'
          item={item}
          editItem={this.saveEditItem}
          acts={this.props.acts}
          database={this.props.database}
          cancel={this.onClickCancelItemAction}
        />
      )
    }
  }

  private renderPreviews() {
    let scheduleIds = Object.keys(this.state.schedule)
    if ( scheduleIds.length > 0 ) {
      if ( this.isEditing ) {
        const editId = ( this.state.itemAction as { id: string }).id
        scheduleIds = scheduleIds.filter(id => id !== editId)
      }
      return (
        <>
          <Header as='h4' content='Schedule' />
          {scheduleIds.map(id => {
            return (
              <ItemPreview 
                key={id} 
                item={this.state.schedule[id]}
                onClickDelete={this.deleteItem}
                onClickEdit={this.onClickEdit}
              />
            )
          })}
        </>
      )
    }
    return null
  }

  // Click handlers
  private onClickNewItem = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ itemAction: 'Create' })
  }

  private onClickCancelItemAction = () => {
    this.setState({ itemAction: undefined })
  }

  private onClickEdit = (id: string) => {
    this.setState({ itemAction: { id }})
  }

  private onClickSaveRehearsal = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    const newRehearsal: IRehearsal = {
      conflicts: [],
      date: this.state.date,
      location: this.state.location,
      notes: [],
      schedule: this.state.schedule
    }

    this.props.onSubmit(newRehearsal)
  }

  private onChangeInput = (evt: React.SyntheticEvent<HTMLInputElement>, data: { name: string, value: string }) => {
    const { name, value } = data
    if ( name === 'date') {
      this.setState({ date: value })
    } else if ( name === 'location') {
      this.setState({ location: value })
    }
  }

  // CRUD Actions
  private saveEditItem = (item: IScheduleItem) => {
    this.setState(({ itemAction, schedule }) => {
      const toEdit = schedule[item.id]
      return {
        itemAction: undefined,
        schedule: {
          ...schedule,
          [item.id]: {
            ...toEdit,
            ...item
          }
        }
      }
    })
  }

  private deleteItem = (id: string) => {
    const schedule = Object.keys(this.state.schedule).reduce<ISchedule>(
      (items, currId) => {
        if ( currId !== id ) {
          return {
             ...items,
             [currId]: this.state.schedule[currId]
          }
        } else {
          return {
            ...items
          }
        }
      }
    , { })
    this.setState({ schedule })
  }

  private createItem = (item: IScheduleItem) => {
    this.setState(({ schedule, itemAction }) => {
      return {
        itemAction: undefined,
        schedule: {
          ...schedule,
          [item.id]: item
        },
      }
    }, () => {
      CreateRehearsal.newItemId = guid()
    })
  }

  // helpers
  private get isEditing(): boolean {
    const { itemAction } = this.state
    return itemAction !== undefined && typeof itemAction !== 'string'
  }

  private get isValid(): boolean {
    const { date, location } = this.state
    return date !== '' && location !== '' && this.scheduleAsArray.length > 0
  }

  private get scheduleAsArray(): IScheduleItem[] {
    return Object.keys(this.state.schedule).map(id => this.state.schedule[id])
  }

  private reset = () => {
    this.setState({
      date: '',
      itemAction: undefined,
      location: '',
      schedule: { },
    })
  }
}

export default CreateRehearsal