import { IScheduleItem } from '../../types'

export enum ItemActionMode  {
  CREATE = 'Create',
  EDIT = 'Edit'
}

export interface ICreateItemAction {
  mode: ItemActionMode.CREATE,
  id: string
}

export interface IEditItemAction {
  mode: ItemActionMode.EDIT,
  item: IScheduleItem
}

export type ItemActionType = ICreateItemAction | IEditItemAction