class Database {
  constructor( 
    private characters: string[] = [] 
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
}

const database = new Database()
export default database