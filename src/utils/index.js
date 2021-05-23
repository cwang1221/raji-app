export function focusErrorInForm(formRef) {
  const firstErrorFieldName = formRef.current.getFieldsError()[0].name[0]
  const firstErrorField = formRef.current.getFieldInstance(firstErrorFieldName)
  firstErrorField.focus({ cursor: 'all' })
}