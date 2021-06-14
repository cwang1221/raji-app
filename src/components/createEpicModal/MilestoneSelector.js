import { Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useMilestone } from '../../hooks/useRequest'
import { MyCard } from '../myCard'
import { MilestoneStateIcon } from '..'
import { SearchInput } from '../searchInput'
import { useEventContext } from '../../contexts/eventContext'

export function MilestoneSelector({ milestoneId, onMilestoneIdChange }) {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState([])
  const [milestones, setMilestones] = useState([])
  const [selectedMilestone, setSelectedMilestone] = useState({})
  const { getMilestones } = useMilestone()
  const { milestoneCreatedEvent, milestoneDeletedEvent } = useEventContext()

  useEffect(() => {
    getMilestoneData()
  }, [milestoneCreatedEvent, milestoneDeletedEvent])

  useEffect(() => {
    setSelectedMilestone(milestones.find((item) => `${item.id}` === milestoneId) || {})
  }, [milestoneId, milestones])

  const getMilestoneData = async () => {
    const data = await getMilestones()
    const indexOfBacklog = data.findIndex((milestone) => milestone.id === 1)
    data.splice(indexOfBacklog, 1)
    data.forEach((milestone) => {
      milestone.icon = <MilestoneStateIcon state={milestone.state} />
    })
    data.unshift({
      id: 'none',
      name: t('epic.noMilestone')
    })
    setMilestones(data)
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const Popup = () => (
    <div>
      <PopupContainer>
        <PopupHeader>
          <span style={{ fontSize: '12px' }}>{t('epic.updateEpicMilestone')}</span>
          <SearchInput onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} onClick={(e) => stopPropagation(e)} />
        </PopupHeader>
        <Menu selectedKeys={[milestoneId]} onSelect={({ key }) => onMilestoneIdChange(key)} style={{ borderRight: '0', maxHeight: '20rem', overflow: 'auto' }}>
          {milestones.filter((item) => item.name.toLowerCase().includes(searchText)).map((item) => (
            <Menu.Item
              key={`${item.id}`}
              icon={item.id !== 'none' && item.icon}
              style={{ fontStyle: item.id === 'none' ? 'italic' : 'normal' }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </PopupContainer>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Button>
        <Title>{t('general.milestone')}</Title>
        <Text isNone={milestoneId === 'none'}>{selectedMilestone.name}</Text>
      </Button>
    </Dropdown>
  )
}

const Button = styled.div`
  border: 1px rgb(217, 217, 217) solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 28px;
  width: 190px;
  text-align: left;
  padding: 8px;

  &:hover {
    border: 1px #804bd6 solid;
    cursor: pointer;
  }
`

const Title = styled.span`
  font-size: 13px;
  color: gray;
`

const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 130px;
  font-style: ${(props) => (props.isNone ? 'italic' : 'normal')};
  color: ${(props) => (props.isNone && 'gray')};
  margin-left: 3px;
`

const PopupContainer = styled(MyCard)`
  width: 170px;

  & .ant-card-body {
    padding: 0;
  }
`

const PopupHeader = styled.div`
  padding: 0.5rem
`
