import * as React from 'react'

// Components
import {
  Button, 
  Header
} from 'semantic-ui-react'
import AddActForm from './add-act-form'

// Types
import { IAct, IScene } from '../../types'
interface ISetupScenesFormProps {
  characters: string[]
  onSubmit: (acts: { [title: string]: IAct }) => void
}
interface ISetupScenesFormState {
  acts: { [title: string]: IAct }
}
class SetupScenesForm extends React.Component<ISetupScenesFormProps, ISetupScenesFormState> {
  constructor(props: ISetupScenesFormProps) {
    super(props)

    this.state = { acts: { } }
  }
  public render() {
    const { acts } = this.state
    const titles = Object.keys(acts)
    return (
      <>
        <Header as='h2' content='Setup Scenes' />
        <Button content='New Act' onClick={this.createAct}/>
        <Button content='Save' onClick={this.submit} />
        {titles.map(title => {
          return (
            <AddActForm 
              key={title}
              title={title}
              allCharacters={this.props.characters}
              onChange={this.updateAct}
            />
          )
        })}
      </>
    )
  }

  private createAct = () => {
    this.setState(({acts}) => {
      const numActs = Object.keys(acts).length
      const title = `Act ${numActs + 1}`
      return {
        acts: {
          ...acts,
          [title]: { title, scenes: { } }
        }
      }
    })
  }

  private updateAct = (title: string, scenes: { [title: string]: IScene }) => {
    this.setState(({ acts }) => {
      const toUpdate = acts[title]
      return {
        acts: {
          [title]: {
            ...toUpdate,
            scenes: { ...scenes }
          }
        }
      }
    })
  }

  private submit = (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    this.props.onSubmit(this.state.acts)
  }
}

export default SetupScenesForm