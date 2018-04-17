// Seeds
import { CHARACTERS } from './characters'

type ListenerArray = Array<() => void>

export class Database {
  public static seed(): Database{
    return new Database(CHARACTERS) 
  }

  constructor( 
    private characters: string[] = [],
    private listeners: {
      addCharacter: ListenerArray
      addCharacters: ListenerArray
      getCharacters: ListenerArray
    } = {
      addCharacter: [],
      addCharacters: [],
      getCharacters: []
    }
  ) {

  }
  
  public getCharacters(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.listeners.getCharacters.forEach(l => l())
      resolve(this.characters)
    })
  }

  public addCharacter(character: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.characters = this.characters.concat(character)
      this.listeners.addCharacter.forEach(l => l())
      resolve(this.characters)
    })
  }

  public addCharacters(...characters: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const promises = characters.map(character => this.addCharacter(character))
      Promise.all(promises)
        .then(() => {
          this.listeners.addCharacters.forEach(l => l())
          resolve(this.characters)
        }).catch(err => {
          throw err
        })
    })
  }

  public on(event: 'addCharacter' | 'addCharacters' | 'getCharacters' , callback: () => void) {
    if ( event === 'addCharacter' ) {
      this.listeners.addCharacter.push(callback)
    } else if ( event === 'addCharacters' ) {
      this.listeners.addCharacters.push(callback)
    } else if ( event === 'getCharacters' ) {
      this.listeners.getCharacters.push(callback)
    }
  }
}

const database = new Database()
export default database