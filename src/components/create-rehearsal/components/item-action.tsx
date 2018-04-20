import * as React from 'react'

// Components
import {
  Button
} from 'semantic-ui-react'

import CreateEditItem from './create-edit-item'

import { IEditItemAction, ItemActionType,  } from '../types'

// Types
import { IActs, IScheduleItem } from '../../../types'

interface IItemActionProps {
  action?: ItemActionType
  onClickNewItem: (evt: React.SyntheticEvent<HTMLElement>) => void
  onClickCancel: () => void
  onClickCreateItem: (item: IScheduleItem) => void
  onClickEditItem: (item: IScheduleItem) => void
  acts: IActs
}

const ItemAction = (props: IItemActionProps): JSX.Element => {
  const { action } = props

  if ( action === undefined ) {
    return (
      <div>
        <Button content='New Item' onClick={props.onClickNewItem} />
      </div>
    )
  } else if ( action.mode === 'Create') {
    return (
      <CreateEditItem 
        action={action}
        createItem={props.onClickCreateItem}
        acts={props.acts}
        cancel={props.onClickCancel}
      />
    )
  }
  
  return (
    <CreateEditItem 
      action={action as IEditItemAction}
      editItem={props.onClickEditItem}
      acts={props.acts}
      cancel={props.onClickCancel}
    />
  )
}

export default ItemAction