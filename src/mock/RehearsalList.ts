import { IRehearsal } from '../types'

const REHEARSALS: IRehearsal[] = [
  {
    conflicts: [],
    date: 'Friday, April 13',
    location: 'Yeoryia Studios',
    notes: [],
    schedule: [
      {
        endTime: '10:00 PM',
        material: ['Dance Audition'],
        people: ['Linda', 'Wendy', 'Kelly', 'Male Dancers'],
        startTime: '7:00 PM'
      }
    ]
  },
  {
    conflicts: [],
    date: 'Saturday, April 14',
    location: 'Our Lady of Perpetual Help',
    notes: ['Lindell covers Jose after 4'],
    schedule: [
      {
        endTime: '4:00',
        material: ['Act 2, Scene 3'],
        people: [
          'King of Egypt', 'Amneris', 'Aida', 'Radames', 'Ramfis',
          'Amonasro', 'Ethiopian Slaves', 'Men\'s Chorus', 'Women\'s Chorus'
        ],
        startTime: '1:00'
      },
      {
        endTime: '6:00',
        material: ['Act 1, Scene 5'],
        people: [
          'High Priestess', 'Ramfis', 'Radames', 'Women\'s Chorus', 'Men\'s Chorus',
          'Female Dancers' 
        ],
        startTime: '4:00'
      }
    ]
  },
  {
    conflicts: ['Paolo'],
    date: 'Tuesday, April 17',
    location: 'Our Lady of Perpetual Help',
    notes: [],
    schedule: [
      {
        endTime: '8:30 PM',
        material: [
          'Act 1, Scene 3'
        ],
        people: [
          'Radames', 'Amneris', 'Aida', 'King of Egypt',
          'Messenger', 'Men\'s Chorus'
        ],
        startTime: '7:00 PM'
      }
    ]
  }
]

export { REHEARSALS }