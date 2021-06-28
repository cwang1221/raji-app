import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'

export function RequesterSelector({ requesterId, onRequesterIdChange }) {
  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const { getUsers } = useUser()

  useEffect(async () => {
    const data = await getUsers()
    data.forEach((user) => {
      user.icon = <Avatar src={user.picture} size={24} />
    })
    setUsers(data)
  }, [])

  return (
    <ObjectSelector
      title={t('general.requester')}
      items={users}
      selectedId={requesterId}
      popupTitle={t('header.selectStoryRequester')}
      onSelect={onRequesterIdChange}
    />
  )
}
