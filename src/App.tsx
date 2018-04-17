import * as React from 'react'
import './App.css'

// Components
import AddRehearsalForm from './components/add-rehearsal-form'
import RehearsalTable from './components/rehearsal-table'

// Types
import { IRehearsal } from './types'

// Mocks
import { REHEARSALS } from './mock/RehearsalList'

// Utils
import * as utils from './utils'

interface IAppState {
  showForm: boolean
  rehearsals: IRehearsal[]
}
class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      rehearsals: [...REHEARSALS],
      showForm: false
    }
  }
  public render() {
    return (
      <div className="App">
      {(() => {
        if ( this.state.showForm ) {
          return <AddRehearsalForm onSubmit={this.addRehearsal}/>
        } else {
          return (<RehearsalTable
            rehearsals={this.state.rehearsals}
          />)
        }
      })()}
      </div>
    )
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
}

export default App
