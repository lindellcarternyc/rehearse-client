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