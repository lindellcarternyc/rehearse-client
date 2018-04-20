import * as React from 'react'
import './App.css'

// Components
import CreateCharactersForm from './components/create-characters-form'
import CreateRehearsal from './components/create-rehearsal'
import DisplayActs from './components/display-acts'
import PreviewRehearsal from './components/PreviewRehearsal'
import SetupScenesForm from './components/setup-scenes-form'

// Mocks
import { Database } from './mock/database'

// Types
import { AppStep } from './app-steps'
import { IAct, IRehearsal } from './types'

interface IAppState {
  acts: { [title: string]: IAct }
  characters: string[]
  currentAppStep: AppStep
  newRehearsal?: IRehearsal
}
class App extends React.Component<{}, IAppState> {
  private database = new Database()

  constructor(props: {}) {
    super(props)

    this.state = {
      acts: { },
      characters: [],
      currentAppStep: AppStep.CREATE_CHARACTERS,
      newRehearsal: undefined
    }
  }

  public componentDidMount() {
    const promises: [Promise<string[]>, Promise<{[title: string]: IAct}>] = [
      this.database.getCharacters(),
      this.database.getActs()
    ]
    Promise.all(promises)
      .then(([characters, acts]) => {
        this.setState({
          acts, characters,
        })
      })
      .catch(err => {
        throw err
      })
  }

  public render() {
    return (
      <div className="App">
        {this.renderCurrentStep()}
      </div>
    )
  }

  private renderCurrentStep() {
    const { currentAppStep } = this.state

    switch ( currentAppStep ) {
      case AppStep.CREATE_CHARACTERS:
        return <CreateCharactersForm createCharacters={this.createCharacters} />
      case AppStep.SETUP_SCENES:
        return <SetupScenesForm characters={this.state.characters} onSubmit={this.saveActs} />
      case AppStep.DISPLAY_ACTS:
        return <DisplayActs acts={this.state.acts}/>
      case AppStep.CREATE_REHEARSAL:
        return <CreateRehearsal acts={this.state.acts} database={this.database} onSubmit={this.saveNewRehearsal}/>
      case AppStep.DISPLAY_NEW_REHEARSAL:
        const newRehearsal = this.state.newRehearsal!
        return (
          <PreviewRehearsal {...newRehearsal} />
        )
      default:
        return <div>ERROR</div>
    }
  }

  private createCharacters = (characters: string[]) => {
    this.database.addCharacters(...characters)
      .then(data => {
        this.setState({ characters: data, currentAppStep: AppStep.SETUP_SCENES })
      }).catch(err => {
        throw err
      })
  }

  private saveActs = (acts: { [title: string]: IAct }) => {
    // tslint:disable-next-line:no-console
    console.log('user wants to save')
    this.database.saveActs(acts).then(data => {

      this.setState({ acts: data, currentAppStep: AppStep.DISPLAY_ACTS })
    }).catch(err => {
      throw err
    })
  }

  private saveNewRehearsal = (newRehearsal: IRehearsal) => {
    this.setState({ newRehearsal, currentAppStep: AppStep.DISPLAY_NEW_REHEARSAL })
  }
}

export default App
