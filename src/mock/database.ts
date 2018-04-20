// Seeds
import { ACTS } from './acts'
import { CHARACTERS } from './characters'

// Types
import { IAct } from '../types'

export class Database {
  public static seed(): Database{
    return new Database(CHARACTERS, ACTS) 
  }

  constructor( 
    private characters: string[] = [],
    private acts: { [title: string]: IAct } = { }
  ) {

  }
  public getCharacters(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      resolve(this.characters)
    })
  }

  public addCharacter(character: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.characters = this.characters.concat(character)
      resolve(this.characters)
    })
  }

  public addCharacters(...characters: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const promises = characters.map(character => this.addCharacter(character))
      Promise.all(promises)
        .then(() => {
          resolve(this.characters)
        }).catch(err => {
          throw err
        })
    })
  }

  public getActs(): Promise<{[title: string]: IAct}> {
    return new Promise((resolve, reject) => {
      resolve(this.acts)
    })
  }

  public getAct(title: string): Promise<IAct> {
    return new Promise((resolve, reject) => {
      const act = this.acts[title]
      if ( act !== undefined ) {
        resolve(act)
      } else {
        reject(`No Act with title {${title}}`)
      }
    })
  }

  public getCharactersForAct(actTitle: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getAct(actTitle)
        .then(act => {
          const scenes = act.scenes
          const characters = Object.keys(scenes)
            .reduce<string[]>(
              (chars, sceneTitle) => {
                return [
                  ...chars,
                  ...scenes[sceneTitle].characters
                ]
              }
            , [])
              resolve(characters)
        })
        .catch(err => {
          throw err
        })
    })
  }

  public getCharactersForScene(sceneTitle: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const actTitle = sceneTitle.split(', ')[0]
      this.getAct(actTitle)
        .then(act => {
          const scene = act.scenes[sceneTitle]
          if (scene !== undefined ) {
            resolve(scene.characters)
          } else {
            reject('No Scene with title ' + sceneTitle)
          }
        }).catch(err => {
          throw err
        })
    })
  }

  public saveActs(acts: { [title: string]: IAct }): Promise<{[title: string]: IAct}> {
    this.acts = {
      ...this.acts,
      ...acts
    }
    return this.getActs()
  }
}

const database = new Database()
export default database