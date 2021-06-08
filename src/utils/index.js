import _ from 'lodash'

export function focusErrorInForm(formRef) {
  const firstErrorFieldName = formRef.current.getFieldsError()[0].name[0]
  const firstErrorField = formRef.current.getFieldInstance(firstErrorFieldName)
  firstErrorField.focus({ cursor: 'all' })
}

export function clone(value) {
  return _.cloneDeep(value)
}

export function rgbToHex(rgb) {
  const rgbArray = rgb.split('(')[1].split(')')[0].split(', ')
  const hexArray = rgbArray.map((x) => {
    x = parseInt(x, 10).toString(16)
    return (x.length === 1) ? `0${x}` : x
  })
  return `#${hexArray.join('')}`
}

export function setHeaderCreateButton() {

}
