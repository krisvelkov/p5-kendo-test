import { useState } from 'react'
import { Field, FieldWrapper, Form, FormElement, type FieldValidatorType } from '@progress/kendo-react-form'
import { Button } from '@progress/kendo-react-buttons'
import { FormCheckbox, FormDatePicker, FormInput } from '../components/FormFields'

interface RegistrationValues {
  fullName: string
  email: string
  birthDate: Date | null
  acceptTerms: boolean
}

// Intentionally permissive: one "@", a dot in the domain, no whitespace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const required =
  (label: string) =>
  (value: unknown): string =>
    value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
      ? `${label} is required.`
      : ''

const emailValidator: FieldValidatorType = (value: string) =>
  required('Email')(value) || (EMAIL_PATTERN.test(value) ? '' : 'Enter a valid email address, e.g. name@example.com.')

const today = new Date()
const minBirthDate = new Date(1900, 0, 1)
const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

const birthDateValidator: FieldValidatorType = (value: Date | null) => {
  if (!value) return 'Date of birth is required.'
  if (value < minBirthDate) return 'Enter a date after 1 January 1900.'
  if (value > maxBirthDate) return 'You must be at least 18 years old.'
  return ''
}

const termsValidator: FieldValidatorType = (value: boolean) =>
  value ? '' : 'You must accept the terms to continue.'

const fullNameValidators = [required('Full name')]

const initialValues: RegistrationValues = {
  fullName: '',
  email: '',
  birthDate: null,
  acceptTerms: false,
}

function RegistrationForm() {
  const [submitted, setSubmitted] = useState<RegistrationValues | null>(null)
  // Bumping the key remounts the Form, which is the supported way to reset it after submit.
  const [formKey, setFormKey] = useState(0)

  const handleSubmit = (values: Record<string, unknown>) => {
    setSubmitted(values as unknown as RegistrationValues)
    setFormKey((k) => k + 1)
  }

  return (
    <section className="screen form-container" aria-labelledby="registration-heading">
      <h2 id="registration-heading">Registration</h2>
      <p className="screen-intro">All fields are required.</p>

      <div role="status" aria-live="polite" className="status-message">
        {submitted && (
          <div className="k-messagebox k-messagebox-success">
            Thanks, {submitted.fullName}. A confirmation was sent to {submitted.email}.
          </div>
        )}
      </div>

      <Form
        key={formKey}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement noValidate>
            <fieldset className="k-form-fieldset">
              <legend className="sr-only">Personal details</legend>
              <Field
                id="fullName"
                name="fullName"
                label="Full name"
                autoComplete="name"
                component={FormInput}
                validator={fullNameValidators}
              />
              <Field
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                hint="We'll only use this to confirm your registration."
                component={FormInput}
                validator={emailValidator}
              />
              <Field
                id="birthDate"
                name="birthDate"
                label="Date of birth"
                min={minBirthDate}
                max={maxBirthDate}
                hint="You must be 18 or older."
                component={FormDatePicker}
                validator={birthDateValidator}
              />
              <Field
                id="acceptTerms"
                name="acceptTerms"
                label="I accept the terms and conditions"
                component={FormCheckbox}
                validator={termsValidator}
              />
            </fieldset>
            <FieldWrapper>
              <div className="k-form-buttons">
                <Button type="submit" themeColor="primary">
                  Register
                </Button>
                <Button type="button" onClick={formRenderProps.onFormReset}>
                  Clear
                </Button>
              </div>
            </FieldWrapper>
          </FormElement>
        )}
      />
    </section>
  )
}

export default RegistrationForm
