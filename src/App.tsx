import * as React from 'react'
import './App.css'

// Components
import AddRehearsalForm from './components/add-rehearsal-form'
import CreateCharactersForm from './components/create-characters-form'
import RehearsalTable from './components/rehearsal-table'

// Types
import { IRehearsal } from './types'

// Mocks
import { REHEARSALS } from './mock/RehearsalList'

// Utils
import * as utils from './utils'

interface IAppState {
  characters: string[]
  rehearsals: IRehearsal[]
  current?: 'Add Rehearsal' | 'Rehearsals' | 'Create Characters'
}
class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      characters: [],
      current: 'Create Characters',
      rehearsals: [...REHEARSALS],
    }
  }
  public render() {
    return (
      <div className="App">
        {this.renderCurrent()}
      </div>
    )
  }

  private renderCurrent(): JSX.Element {
    const { current, rehearsals } = this.state
    switch ( current ) {
      case 'Create Characters':
        return(
          <CreateCharactersForm createCharacters={this.createCharacters}/>
        )
      case 'Add Rehearsal':
        return (
          <AddRehearsalForm 
            onSubmit={this.addRehearsal}
          />
        )
      case 'Rehearsals':
        return (
          <RehearsalTable rehearsals={rehearsals} />
        )
      default:
        return <div>{this.state.characters.length} Characters</div>
    }
  }

  private addRehearsal = (rehearsal: IRehearsal) => {
    this.setState(({rehearsals}) => {
      return {
        rehearsals: rehearsals.concat(
          this._formatRehearsal(rehearsal)
        )
      }
    })
  }

  private _formatRehearsal(rehearsal: IRehearsal): IRehearsal {
    const { schedule } = rehearsal

    return {
      ...rehearsal,
      date: utils.formatDate(rehearsal.date),
      schedule: schedule.map(item => {
        return {
          ...item,
          endTime: utils.formatTime(item.endTime),
          startTime: utils.formatTime(item.startTime),
        }
      })
    }
  }

  private createCharacters = (characters: string[]) => {
    this.setState({ characters, current: undefined})
  }
}

export default App
