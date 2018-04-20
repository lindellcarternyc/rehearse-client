import * as React from 'react'

// Components
import { Dropdown, FormField } from 'semantic-ui-react'
import { IAct, IActs } from '../../../types'

// Types
interface IOption {
  key: string
  text: string
  value: string
}

// Utils
const stringToOption = (input: string): IOption => {
  return {
    key: input,
    text: input,
    value: input
  }
}

const getOptionsForAct = (act: IAct): IOption[] => {
  const runActOption = stringToOption('Run ' + act.title)
  const sceneOptions = Object.keys(act.scenes).map(stringToOption)

  return [
    runActOption,
    ...sceneOptions
  ]
}

const getAllOptions = (acts: IActs): IOption[] => {
  return Object.keys(acts).reduce<IOption[]>(
    (options, actTitle) => {
      const act = acts[actTitle]
      return [
        ...options,
        ...getOptionsForAct(act)
      ]
    }
  , [])
}

interface ISelectMaterialDropdownProps {
  acts: IActs
  value: string
  onChange: (material: string) => void
}
const SelectMaterialDropdown = (props: ISelectMaterialDropdownProps): JSX.Element => {
  const options = getAllOptions(props.acts)
  const onChange = (evt: React.SyntheticEvent<HTMLElement>, data: { value: string }) => {
    evt.preventDefault()
    evt.stopPropagation()
    props.onChange(data.value)
  }
  return (
    <FormField>
      <label>Material</label>
      <Dropdown 
        fluid selection
        options={options}
        value={props.value}
        onChange={onChange}
      />
    </FormField>
  )
}

export default SelectMaterialDropdown