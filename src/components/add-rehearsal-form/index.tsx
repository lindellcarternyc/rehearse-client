import * as React from 'react'

// Components
import { 
  Button,
  Form, FormButton, FormField,
  FormInput,
  FormTextArea,
  Header,
} from 'semantic-ui-react'

// Types
import { IRehearsal, IRehearsalScheduleItem } from '../../types'
const InitialRehearsalScheduleItem: IRehearsalScheduleItem = {
  endTime: '',
  material: [],
  people: [],
  startTime: ''
}

interface IAddRehearsalFormProps {
  onSubmit: (rehearsal: IRehearsal) => void
}

interface IAddRehearsalFormState {
  date: string
  location: string
  schedule: IRehearsalScheduleItem[]
  addItem: IRehearsalScheduleItem
  conflicts: string[]
  notes: string[]
}
const InitialState: IAddRehearsalFormState = {
  addItem: { ...InitialRehearsalScheduleItem },
  conflicts: [],
  date: '',
  location: '',
  notes: [],
  schedule: []
}
class AddRehearsalForm extends React.Component<IAddRehearsalFormProps, IAddRehearsalFormState> {
  constructor(props: IAddRehearsalFormProps) {
    super(props)

    this.state = {
      ...InitialState
    }
  }
  
  public render() {
    const { 
      date, location,
      addItem, schedule,
      conflicts, notes
    } = this.state
    return (
      <>
      <Header as="h2" content="Add Rehearsal" />
      <Form>
        <FormInput 
          label="Date"
          type="date"
          value={date}
          name="date"
          onChange={this.onChange}
        />
        <FormInput 
          label="Location"
          type="text"
          name="location"
          value={location}
          onChange={this.onChange}
        />
        <label>Schedule</label>
        <label>{schedule.length}</label>
        <FormField>
          <label>Add Item</label>
          <FormInput 
            label="Start time"
            type="time"
            name="startTime"
            value={addItem.startTime}
            onChange={this.onChange}
          />
          <FormInput 
            label="End time"
            type="time"
            name="endTime"
            value={addItem.endTime}
            onChange={this.onChange}
          />
          <FormTextArea 
            label="Material"
            name="material"
            value={addItem.material.join('\n')}
            onChange={this.onChange}
          />
          <FormTextArea label="People" 
            name="people" value={addItem.people.join(',')}
            onChange={this.onChange}
          />
          <Button content="Add Item" 
            disabled={!this._isAddItemValid}
            onClick={this.addItemToSchedule}
          />
        </FormField>
        <FormTextArea label="Conflicts" 
          name="conflicts" value={conflicts.join('\n')}
          onChange={this.onChange}
        />
        <FormTextArea label="Notes" 
          name="notes" value={notes.join('\n')}
          onChange={this.onChange}
        />
        <FormButton content="Clear" onClick={this.reset} />
        <FormButton 
          content="Add Rehearsal" 
          disabled={!this._isValid}
          onClick={this.submit}
        />
      </Form>
      </>
    )
  }

  private onChange = (evt: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, data: { name: string, value: string }) => {
    const { name, value } = data
    switch ( name ) {
      case 'date':
        return this._updateDate(value)
      case 'location':
        return this._updateLocation(value)
      case 'startTime':
        return this._updateAddItemStartTime(value)
      case 'endTime': 
        return this._updateAddItemEndTime(value)
      case 'material':
        return this._updateAddItemMaterial(value)
      case 'people':
        return this._updateAddItemPeople(value)
      case 'notes':
        return this._updateNotes(value)
      case 'conflicts':
        return this._updateConflicts(value)
      default: 
        return
    }
  }

  private reset = () => {
    this.setState({
      ...InitialState
    })
  }

  private _updateDate(date: string) {
    this.setState({ date })
  }

  private _updateLocation(location: string) {
    this.setState({ location })
  }

  private _updateAddItemStartTime(startTime: string) {
    this.setState(({addItem}) => {
      return {
        addItem: {
          ...addItem,
          startTime
        }
      }
    })
  }

  private _updateAddItemEndTime(endTime: string) {
    this.setState(({ addItem }) => {
      return {
        addItem: {
          ...addItem,
          endTime
        }
      }
    })
  }

  private _updateAddItemMaterial(material: string) {
    this.setState(({addItem}) => {
      return {
        addItem: {
          ...addItem,
          material: material.split('\n')
        }
      }
    })
  }

  private _updateAddItemPeople(people: string) {
    this.setState(({ addItem }) => {
      return {
        addItem: {
          ...addItem,
          people: people.split(',')
        }
      }
    })
  }

  private get _isAddItemValid(): boolean {
    const { addItem } = this.state

    return addItem.startTime !== ''
      && addItem.endTime !== ''
      && addItem.material.length > 0
      && addItem.people.length > 0
  }

  private addItemToSchedule = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    const { addItem } = this.state
    this.setState(({schedule}) => {
      return {
        addItem: {
          ...InitialRehearsalScheduleItem
        },
        schedule: [...schedule, addItem],
      }
    })
  }

  private _updateNotes(notes: string) {
    this.setState({
      notes: notes.split('\n')
    })
  }

  private _updateConflicts(conflicts: string) {
    this.setState({
      conflicts: conflicts.split('\n')
    })
  }

  private get _isValid(): boolean {
    const { 
      date, location, schedule
    } = this.state
    return date !== '' && location !== '' && schedule.length > 0
  }

  private submit = () => {
    const { 
      date, location, schedule, conflicts, notes
    } = this.state
    this.props.onSubmit({date, location, schedule, conflicts, notes})
  }
}

export default AddRehearsalForm