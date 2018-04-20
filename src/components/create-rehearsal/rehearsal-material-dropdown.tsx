import * as React from 'react'

// Components 
import { Dropdown } from 'semantic-ui-react'

// Types
import { IAct, IActs } from '../../types'

interface IRehearsalMaterialDropdownProps {
  acts: IActs
  onChange: (material: string) => void
  value: string
}

interface IOption {
  key: string
  value: string
  text: string
}

const getOptionsForAct = (act: IAct): IOption[] => {
  const runActText = `Run ${act.title}`
  const runActOption = {
    key: runActText,
    text: runActText,
    value: runActText
  }
  const scenesOptions = Object.keys(act.scenes).map<IOption>(title => {
    return {
      key: title,
      text: title,
      value: title
    }
  })
  return [runActOption, ...scenesOptions]
}

const getOptions = (acts: IActs): IOption[] => {
  const actsOptions = Object.keys(acts)
    .reduce<IOption[]>(
      (options, title) => {
        const act = acts[title]
        return [
          ...options,
          ...getOptionsForAct(act)
        ]
      }
    , [])
  return [
    {key: 'Run Opera', value: 'Run Opera', text: 'Run Opera'},
    ...actsOptions
  ]
}

const RehearsalMaterialDropdown = (props: IRehearsalMaterialDropdownProps) => {
  const onChange = (evt: React.SyntheticEvent<HTMLElement>, data: { value: string }) => {
    props.onChange(data.value)
  }
  return (
    <Dropdown
      fluid
      selection
      options={getOptions(props.acts)}
      onChange={onChange}
      value={props.value}
    />
  )
}

export default RehearsalMaterialDropdown