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