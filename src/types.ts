export interface IRehearsalScheduleItem {
  startTime: string
  endTime: string
  material: string[]
  people: string[]
}

export interface IRehearsal {
  date: string
  location: string
  notes: string[]
  conflicts: string[]
  schedule: IRehearsalScheduleItem[]
}

export interface IScene {
  title: string
}

export interface IAct {
  title: string
  scenes: { [title: string]: IScene }
}