import * as React from 'react'
import './App.css'

// Components
import CreateCharactersForm from './components/create-characters-form'

// Mocks
import { Database } from './mock/database'

import { AppStep } from './app-steps'

interface IAppState {
  characters: string[]
  currentAppStep: AppStep
}
class App extends React.Component<{}, IAppState> {
  private database = Database.seed()
  constructor(props: {}) {
    super(props)

    this.state = {
      characters: [],
      currentAppStep: AppStep.SETUP_SCENES,
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
        return <div>Setup Scenes</div>
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
}

export default App
