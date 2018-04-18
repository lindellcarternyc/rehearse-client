import * as React from 'react'

import { List } from 'semantic-ui-react'

// Types
import { IAct, IScene } from '../../types'
type DisplaySceneProps = IScene

const DisplayScene = (props: DisplaySceneProps): JSX.Element => {
  const { title, characters } = props
  return(
    <div style={{marginLeft: '1rem'}}>
      <List>
        <List.Item>
          <List.Header>{title}</List.Header>
          <List>
            {characters.map(character => {
              return <List.Item key={character} content={character} />
            })}
          </List>
        </List.Item>
      </List>
    </div>
  )
}

type DisplayActProps = IAct
const DisplayAct = (props: DisplayActProps): JSX.Element => {
  const title = props.title
  const scenes = Object.keys(props.scenes).map(t => props.scenes[t])

  return (
    <List.Item>
      <List.Content>
        <List.Header>{title}</List.Header>
        {scenes.map(scene => {
          return (
            <DisplayScene 
              key={scene.title}
              title={scene.title} 
              characters={scene.characters}
            />
          )
        })}
      </List.Content>
    </List.Item>
  )
}

interface IDisplayActsProps {
  acts: { [title: string]: IAct }
}
const DisplayActs = (props: IDisplayActsProps): JSX.Element => {
  const acts = Object.keys(props.acts).map(title => props.acts[title])

  return (
    <List>
      {acts.map(act => {
        return (
          <DisplayAct key={act.title} { ...act }/>
        )
      })}
    </List>
  )
}

export default DisplayActs