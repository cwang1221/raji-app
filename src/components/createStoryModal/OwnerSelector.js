import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'

export function OwnerSelector({ ownerId, onOwnerIdChange, style }) {
  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const { getUsers } = useUser()

  useEffect(async () => {
    const data = await getUsers()
    data.forEach((user) => {
      user.icon = <Avatar src={user.picture} size={24} />
    })
    data.unshift({
      id: 'none',
      name: t('general.nobody'),
      icon: <UserOutlined />
    })
    setUsers(data)
  }, [])

  return (
    <ObjectSelector
      title={t('general.owner')}
      items={users}
      selectedId={ownerId}
      popupTitle={t('header.selectStoryOwner')}
      onSelect={onOwnerIdChange}
      style={style}
    />
  )
}
