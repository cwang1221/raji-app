import { Modal } from 'antd'

export function MyModal(props = {}) {
  const keyboard = props.hasOwnProperty('keyboard') ? props.keyboard : false
  const maskClosable = props.hasOwnProperty('maskClosable') ? props.maskClosable : false

  return (
    <Modal {...props} keyboard={keyboard} maskClosable={maskClosable} />
  )
}
