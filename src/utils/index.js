import _ from 'lodash'

export function focusErrorInForm(formRef) {
  const firstErrorFieldName = formRef.current.getFieldsError().find((item) => item.errors.length).name[0]
  const firstErrorField = formRef.current.getFieldInstance(firstErrorFieldName)
  firstErrorField.focus({ cursor: 'all' })
}

export function clone(value) {
  return _.cloneDeep(value)
}

export function stopPropagation(e) {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
}
