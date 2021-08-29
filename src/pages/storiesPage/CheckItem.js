import { BorderOutlined, CheckSquareFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'

export function CheckItem({ checked, color, children, onCheck, tooltip }) {
  const onClick = () => onCheck(!checked)
  return (
    <Tooltip title={tooltip}>
      <div role="button" tabIndex="0" onClick={onClick} onKeyPress={onClick} className="flex items-center mt-2">
        {checked ? <CheckSquareFilled style={{ color }} className="mr-2" />
          : <BorderOutlined style={{ color }} className="mr-2" />}
        {children}
      </div>
    </Tooltip>
  )
}
