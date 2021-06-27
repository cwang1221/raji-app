import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { clone } from 'lodash'
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import { subscribe, unsubscribe } from 'pubsub-js'
import { FilterTitle } from './FilterTitle'
import { useEpic } from '../../hooks/useRequest'
import { CheckItem } from './CheckItem'
import { EpicStateIcon } from '../../components'
import { EPIC_CREATED } from '../../utils/events'

export function EpicFilter({ selectedEpicIds, onSelectionChange, expanded, onExpandedChange }) {
  const { t } = useTranslation()
  const [epics, setEpics] = useState([])
  const [showHidden, setShowHiden] = useState(false)
  const [itemsHeight, setItemsHeight] = useState('0')

  const { getEpics } = useEpic()

  useEffect(() => {
    getEpicData()
    subscribe(EPIC_CREATED, getEpicData)

    return () => {
      unsubscribe(EPIC_CREATED)
    }
  }, [])

  useEffect(() => {
    const countOfEpics = epics.length
    const countOfUnfinishedEpics = epics.filter((epic) => epic.state !== 'done').length

    setItemsHeight(showHidden ? countOfEpics * 30 + 24 : countOfUnfinishedEpics * 30 + 24)
  }, [epics, showHidden])

  const getEpicData = async () => {
    const data = await getEpics()
    data.forEach((epic) => { epic.id = epic.id.toString() })
    data.unshift({
      id: '0',
      name: t('story.noEpic')
    })
    setEpics(data)
    selectedEpicIds.length === 0 && onSelectionChange(data.map((epic) => epic.id))
  }

  const onCheck = (id, checked) => {
    const selectedEpicIdsClone = clone(selectedEpicIds)
    if (checked) {
      selectedEpicIdsClone.push(id)
    } else {
      const index = selectedEpicIdsClone.indexOf(id)
      selectedEpicIdsClone.splice(index, 1)
    }
    onSelectionChange(selectedEpicIdsClone)
  }

  return (
    <Container>
      <FilterTitle expanded={expanded} title={t('story.unfinishedEpics').toLocaleUpperCase()} onExpandedChange={onExpandedChange} />
      <ItemsContainer expanded={expanded} height={itemsHeight}>
        {epics.filter((epic) => epic.state !== 'done').map((epic) => (
          <CheckItem key={epic.id} checked={selectedEpicIds.includes(epic.id)} onCheck={(checked) => onCheck(epic.id, checked)} tooltip={epic.name}>
            {epic.state && <EpicStateIcon state={epic.state} />}
            <EpicName style={{ fontStyle: epic.id === '0' ? 'italic' : 'normal' }}>{epic.name}</EpicName>
          </CheckItem>
        ))}

        <HidenEpicsHeader onClick={() => setShowHiden(!showHidden)}>
          <span style={{ marginRight: '0.5rem' }}>{t('story.otherEpics')}</span>
          {showHidden ? <CaretDownFilled /> : <CaretRightFilled />}
        </HidenEpicsHeader>

        <ItemsContainer expanded={showHidden} height={epics.filter((epic) => epic.state === 'done').length * 30}>
          {showHidden && epics.filter((epic) => epic.state === 'done').map((epic) => (
            <CheckItem key={epic.id} checked={selectedEpicIds.includes(epic.id)} onCheck={(checked) => onCheck(epic.id, checked)} tooltip={epic.name}>
              <EpicStateIcon state={epic.state} />
              <EpicName>{epic.name}</EpicName>
            </CheckItem>
          ))}
        </ItemsContainer>
      </ItemsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemsContainer = styled.div`
  overflow: hidden;
  height: ${(props) => (props.expanded ? `${props.height}px` : '0')};
  -webkit-transition:height 300ms ease-in-out;
  -moz-transition:height 300ms ease-in-out;
  -o-transition:height 300ms ease-in-out;
  transition:height 300ms ease-in-out;
`

const HidenEpicsHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    color: black;
  }
`

const EpicName = styled.span`
  margin-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
