import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

export function SearchInput(props = {}) {
  return (
    <div className="flex items-center">
      <Input {...props} className="bg-transparent" />
      <SearchOutlined className="text-gray-500 -ml-6" />
    </div>
  )
}
