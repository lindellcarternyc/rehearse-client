import { IAct } from '../types'

const ACTS: { [title: string]: IAct } = {
  'Act 1': {
    scenes: {
      'Act 1, Scene 1': {
        characters: [
          'Ramfis', 'Radames'
        ],
        title: 'Act 1, Scene 1',
      },
      'Act 1, Scene 2': {
        characters: ['Radames', 'Amneris', 'Aida'],
        title: 'Act 1, Scene 2'
      },
      'Act 1, Scene 3': {
        characters: [
          'Radames', 'Amneris', 'Aida', 'King of Egypt',
          'Ramfis', 'Messenger', 'Men\'s Chorus',
          'Womens\'s Chorus', 
        ],
        title: 'Act 2, Scene 3'
      },
      'Act 1, Scene 4': {
        characters: ['Aida'],
        title: 'Act 1, Scene 4'
      },
      'Act 1, Scene 5': {
        characters: [
          'High Priestess', 'Ramfis', 'Radames',
          'Men\'s Chorus', 'Women\'s Chorus',
          'Female Dancers' 
        ],
        title: 'Act 1, Scene 5'
      }
    },
    title: 'Act 1',
  },
  'Act 2': {
    scenes: {
      'Act 2, Scene 1': {
        characters: [
          'Women\'s Chorus', 'Female Dancers', 'Amneris'
        ],
        title: 'Act 2, Scene 1'
      },
      'Act 2, Scene 2': {
        characters: [
          'Amneris', 'Aida',
          'Men\'s Chorus', 'Women\'s Chorus'
        ],
        title: 'Act 2, Scene 2'
      },
      'Act 2, Scene 3': {
        characters: [
          'King of Egypt', 'Amneris', 'Aida', 'Radames',
          'Ramfis', 'Amonasro', 'Ethiopian Slaves',
          'Men\'s Chorus', 'Women\'s Chorus'
        ],
        title: 'Act 2, Scene 3'
      }
    },
    title: 'Act 2'
  },
  'Act 3': {
    scenes: { 
      'Act 3, Scene 1': {
        characters: [
          'Aida', 'High Priestess', 'Men\'s Chorus',
          'Ramfis', 'Amneris'
        ],
        title: 'Act 3, Scene 2'
      },
      'Act 3, Scene 2': {
        characters: [
          'Aida', 'Amonasro'
        ],
        title: 'Act 3, Scene 2'
      },
      'Act 3, Scene 3': {
        characters: [
          'Aida', 'Radames', 'Amonasro',
          'Amneris', 'Ramfis'
        ],
        title: 'Act 3, Scene 3'
      }
    },
    title: 'Act 3'
  },
  'Act 4': {
    scenes: {
      'Act 4, Scene 1': {
        characters: [
          'Amneris', 'Radames'
        ],
        title: 'Act 4, Scene 1'
      },
      'Act 4, Scene 2': {
        characters: [
          'Ameris', 'Ramfis', 'Men\'s Chorus' 
        ],
        title: 'Act 4, Scene 2'
      },
      'Act 4, Scene 3': {
        characters: [
          'Radames', 'Aida', 'Amneris',
          'Mens\'s Chorus', 'Women\'s Chorus',
          'Male Dancers'
        ],
        title: 'Act 4, Scene 3'
      }
    },
    title: 'Act 4'
  }
}

export { ACTS }