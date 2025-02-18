/* eslint-disable no-unused-vars */
import { forwardRef } from 'react'
import { InputAttributes, NumberFormatValues, PatternFormat, PatternFormatProps } from 'react-number-format'

import { Input } from './input'

interface InputPatternProps extends Omit<PatternFormatProps<InputAttributes>, 'form'> {
  onChangeCustom?: (value: NumberFormatValues) => void
  value: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...e: any[]) => void
}

/*
  https://github.com/s-yadav/react-number-format/issues/500#issuecomment-797342449

  According to this, we need to set to empty string
  so that the input clears and nice UX
*/
const InputPattern = forwardRef<HTMLInputElement, InputPatternProps>(({ format = '+92 ### #######', onChange, onChangeCustom, value, ...props }, ref) => {
  return (
    <PatternFormat
      getInputRef={ref}
      allowEmptyFormatting
      mask="_"
      format={format}
      customInput={Input}
      value={value}
      defaultValue={value}
      onValueChange={(values) => {
        onChange(values.formattedValue)

        // For performing other operations after the onchange event
        onChangeCustom?.(values)
      }}
      aria-disabled={props.disabled}
      aria-required={props.required ? 'true' : undefined}
      aria-readonly={props.readOnly ? 'true' : undefined}
      {...props}
    />
  )
})

export default InputPattern
