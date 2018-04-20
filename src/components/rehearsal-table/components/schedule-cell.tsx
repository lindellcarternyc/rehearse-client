// import * as React from 'react'

// import { IRehearsalScheduleItem } from '../../../types'
// const RehearsalScheduleItem = (props: IRehearsalScheduleItem): JSX.Element => {
//   return (
//     <>
//       <td>{props.startTime} - {props.endTime}</td>
//       <td>{props.material.join('\n')}</td>
//       <td>{props.people.join(', ')}</td>
//     </>
//   )
// }

// export interface IRehearsalScheduleProps {
//   schedule: IRehearsalScheduleItem[]
// }
// const RehearsalSchedule = (props: IRehearsalScheduleProps): JSX.Element => {
//   return (
//     <>
//       {props.schedule.map((item, idx) => {
//         return (
//           <RehearsalScheduleItem 
//             key={item.startTime + idx.toString(10)}
//             {...item}
//           />
//         )
//       })}
//     </>
//   )
// }

// export default RehearsalSchedule