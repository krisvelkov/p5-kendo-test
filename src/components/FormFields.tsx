import type { FieldRenderProps } from '@progress/kendo-react-form'
import { FieldWrapper } from '@progress/kendo-react-form'
import { Checkbox, Input } from '@progress/kendo-react-inputs'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { Error as FieldError, Hint, Label } from '@progress/kendo-react-labels'

/**
 * Shared wiring for a Kendo form field: shows the error only after the field
 * is touched and links hint/error text to the editor via aria-describedby.
 */
function getFieldMessages({ id, touched, validationMessage, hint }: FieldRenderProps) {
  const showError = Boolean(touched && validationMessage)
  const showHint = !showError && Boolean(hint)
  const hintId = `${id}_hint`
  const errorId = `${id}_error`
  const describedBy = [showHint && hintId, showError && errorId].filter(Boolean).join(' ') || undefined

  return { showError, showHint, hintId, errorId, describedBy }
}

export function FormInput(fieldProps: FieldRenderProps) {
  // Pull out the Field-only props so they are not forwarded to the DOM input.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { validationMessage, touched, visited, modified, label, id, valid, disabled, hint, optional, ...others } =
    fieldProps
  const { showError, showHint, hintId, errorId, describedBy } = getFieldMessages(fieldProps)

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <Input
          id={id}
          valid={valid}
          disabled={disabled}
          ariaDescribedBy={describedBy}
          aria-invalid={showError || undefined}
          aria-required={!optional}
          {...others}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showError && <FieldError id={errorId}>{validationMessage}</FieldError>}
      </div>
    </FieldWrapper>
  )
}

export function FormDatePicker(fieldProps: FieldRenderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { validationMessage, touched, visited, modified, label, id, valid, disabled, hint, optional, ...others } =
    fieldProps
  const { showError, showHint, hintId, errorId, describedBy } = getFieldMessages(fieldProps)

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <DatePicker id={id} valid={valid} disabled={disabled} ariaDescribedBy={describedBy} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showError && <FieldError id={errorId}>{validationMessage}</FieldError>}
      </div>
    </FieldWrapper>
  )
}

export function FormCheckbox(fieldProps: FieldRenderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { validationMessage, touched, visited, modified, label, id, valid, disabled, hint, optional, value, ...others } =
    fieldProps
  const { showError, showHint, hintId, errorId, describedBy } = getFieldMessages(fieldProps)

  return (
    <FieldWrapper>
      <div className="k-form-field-wrap">
        <Checkbox
          id={id}
          label={label}
          checked={Boolean(value)}
          valid={valid}
          disabled={disabled}
          ariaDescribedBy={describedBy}
          {...others}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showError && <FieldError id={errorId}>{validationMessage}</FieldError>}
      </div>
    </FieldWrapper>
  )
}
