export interface IRehearsal {
  date: string
  location: string
  notes: string[]
  conflicts: string[]
  schedule: ISchedule
}

export interface IScene {
  title: string
  characters: string[]
}

export interface IAct {
  title: string
  scenes: { [title: string]: IScene }
}

export interface IActs {
  [title: string]: IAct
}

export interface IScheduleItem {
  id: string
  startTime: string
  endTime: string
  material: string
  characters: string[]
}

export interface ISchedule {
  [id: string]: IScheduleItem
}