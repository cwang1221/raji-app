import { Modal as AntModal } from 'antd'

export function Modal(props = {}) {
  const closable = props.hasOwnProperty('closable') ? props.closable : false
  const keyboard = props.hasOwnProperty('keyboard') ? props.keyboard : false
  const maskClosable = props.hasOwnProperty('maskClosable') ? props.maskClosable : false

  return (
    <AntModal {...props} closable={closable} keyboard={keyboard} maskClosable={maskClosable} />
  )
}
