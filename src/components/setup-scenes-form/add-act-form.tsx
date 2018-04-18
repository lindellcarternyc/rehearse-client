import * as React from 'react'

// Components
import { 
  Button,
  Header,
  Segment
} from 'semantic-ui-react'

import AddSceneForm from './add-scene-form'

// Types
import { IScene } from '../../types'

interface IAddActFormProps {
  title: string
  allCharacters: string[]
  onChange: (title: string, scenes: { [title: string]: IScene }) => void
}
interface IAddActFormState {
  scenes: { [title: string]: IScene }
}

class AddActForm extends React.Component<IAddActFormProps, IAddActFormState> {
  constructor(props: IAddActFormProps) {
    super(props)

    this.state = { scenes: { } }
  }
  public render() {
    const { title } = this.props
    const { scenes } = this.state
    const sceneTitles = Object.keys(scenes)

    return (
      <Segment>
        <Header as='h3' content={title} />
        <div>{`${sceneTitles.length} scenes`}</div>
        <div>
          <Button content='Clear' onClick={this.clear} disabled={sceneTitles.length === 0}/>
          <Button content='Add Scene' onClick={this.addScene}/>
        </div>
        {sceneTitles.map(sceneTitle => {
          return (
            <AddSceneForm 
              key={sceneTitle}
              title={sceneTitle}
              onChange={this.updateScene}
              allCharacters={this.props.allCharacters}
            />
          )
        })}
      </Segment>
    )
  }

  private addScene = () => {
    const { title } = this.props
    this.setState(({ scenes }) => {
      const numScenes = Object.keys(scenes).length
      const sceneTitle = `${title}, Scene ${numScenes + 1}`
      return {
        scenes: {
          ...scenes,
          [sceneTitle]: { title: sceneTitle }
        }
      }
    })
  }

  private clear = () => {
    this.setState({ scenes: { } })
  }

  private updateScene = (title: string, selectedCharacters: string[]) => {
    this.setState(({scenes}) => {
      const toUpdate = scenes[title]
      return {
        scenes: {
          ...scenes,
          [title]: { ...toUpdate, characters: selectedCharacters }
        }
      }
    }, () => {
      this.props.onChange(this.props.title, this.state.scenes)
    })
  }
}

export default AddActForm