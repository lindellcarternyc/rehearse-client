// import * as React from 'react'

// // Components
// import { 
//   Button,
//   Form,
//   Header,
//   Segment
// } from 'semantic-ui-react'

// import SelectMaterialDropdown from './components/select-material-dropdown'

// // Types
// import { Database } from '../../mock/database'
// import { IActs, IScheduleItem } from '../../types'

// interface ICreateRehearsalItemProps {
//   acts: IActs
//   database: Database
//   onSave: (item: IScheduleItem) => void
// }

// interface ICreateRehearsalItemState {
//   editing: boolean
//   startTime: string
//   endTime: string
//   material: string
//   characters: string[]
// }
// const INITIAL_STATE: ICreateRehearsalItemState = {
//   characters: [],
//   editing: false,
//   endTime: '',
//   material: '',
//   startTime: ''
// }
// class CreateRehearsalItem extends React.Component<ICreateRehearsalItemProps, ICreateRehearsalItemState> {
//   constructor(props: ICreateRehearsalItemProps) {
//     super(props)

//     this.state = { ...INITIAL_STATE }
//   }
//   public render() {
//     return (
//       <Segment>
//         {this.state.editing &&
//           <>
//             <Header as='h4' content='New Item'/>
//             <Button content='Save' onClick={this.save} disabled={!this.isValid} />
//             <Button content='Clear' onClick={this.reset} />
//             <Form>
//               <Form.Input 
//                 label='Start time' name='startTime'
//                 value={this.state.startTime}
//                 onChange={this.onChange}
//                 type='time'
//               />
//               {this.state.startTime !== '' &&
//                 <Form.Input 
//                   label='End time'
//                   name='endTime'
//                   value={this.state.endTime}
//                   type='time'
//                   onChange={this.onChange}
//                 />
//               }
//               {this.state.endTime &&
//                 <SelectMaterialDropdown 
//                   acts={this.props.acts}
//                   onChange={this.updateMaterial}
//                   value={this.state.material}
//                 />
//               }
//             </Form>
//           </>
//         }
//         {!this.state.editing &&
//           <Button content='New Item' onClick={this.startEditing}/>
//         }
//         <div>{JSON.stringify(this.state)}</div>
//       </Segment>
//     )
//   }

//   private startEditing = () => {
//     this.setState({ editing: true })
//   }

//   private onChange = (evt: React.SyntheticEvent<HTMLInputElement>, data: { name: string, value: string }) => {
//     const { name, value } = data
//     if ( name === 'startTime' ) {
//       this.setState({ startTime: value })
//     } else if ( name === 'endTime' ) {
//       this.setState({ endTime: value })
//     }
//   }

//   private updateMaterial = (material: string) => {
//     this.getCharactersForMaterial(material)
//       .then(characters => {
//         this.setState({ material, characters})
//       })
//       .catch()
//   }

//   private getCharactersForMaterial(material: string): Promise<string[]> {
//     return new Promise((resolve, reject) => {
//       if ( material === 'Run Opera') {
//         resolve(['Tutti'])
//       } else if ( material.slice(0, 7) === 'Run Act') {
//         const actTitle = material.slice(4)
//         this.props.database.getCharactersForAct(actTitle)
//           .then(characters => {
//             resolve(characters)
//           })
//           .catch(err => {
//             reject(err)
//           })
//       } else {
//         this.props.database.getCharactersForScene(material)
//           .then(characters => { resolve(characters)})
//           .catch(err => { throw err })
//       }
//     })
//   }

//   private save = (evt: React.SyntheticEvent<HTMLElement>) => {
//     const { startTime, endTime, material, characters } = this.state
//     this.setState(() => {
//       return { ...INITIAL_STATE }
//     }, () => {
//       this.props.onSave({startTime, endTime, material, characters})
//     })
//   }

//   private reset = (evt: React.SyntheticEvent<HTMLElement>) => {
//     evt.preventDefault()
//     evt.stopPropagation()
//     this.setState({
//       ...INITIAL_STATE,
//       editing: true
//     })
//   }

//   private get isValid(): boolean {
//     const { startTime, endTime, material, characters } = this.state
//     return startTime !== ''
//       && endTime !== ''
//       && material !== ''
//       && characters.length > 0
//   }
// }

// export default CreateRehearsalItem