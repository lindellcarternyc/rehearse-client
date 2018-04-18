import * as React from 'react'
import './App.css'

// Components
import CreateCharactersForm from './components/create-characters-form'
import DisplayActs from './components/display-acts'
import SetupScenesForm from './components/setup-scenes-form'

// Mocks
import { Database } from './mock/database'

// Types
import { AppStep } from './app-steps'
import { IAct } from './types'

interface IAppState {
  acts: { [title: string]: IAct }
  characters: string[]
  currentAppStep: AppStep
}
class App extends React.Component<{}, IAppState> {
  private database = Database.seed()
  constructor(props: {}) {
    super(props)

    this.state = {
      acts: { },
      characters: [],
      currentAppStep: AppStep.SETUP_SCENES
    }
  }

  public componentDidMount() {
    this.database.getCharacters().then(characters => {
      this.setState({ characters })
    }).catch(err => {
      // tslint:disable-next-line:no-console
      console.error(err)
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
    
    this.setState({ acts, currentAppStep: AppStep.DISPLAY_ACTS })
  }
}

export default App
