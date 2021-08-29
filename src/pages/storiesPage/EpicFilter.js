import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
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
    <div className="flex flex-col">
      <FilterTitle expanded={expanded} title={t('story.unfinishedEpics').toLocaleUpperCase()} onExpandedChange={onExpandedChange} />
      <ItemsContainer style={{ height: expanded ? `${itemsHeight}px` : 0 }}>
        {epics.filter((epic) => epic.state !== 'done').map((epic) => (
          <CheckItem key={epic.id} checked={selectedEpicIds.includes(epic.id)} onCheck={(checked) => onCheck(epic.id, checked)} tooltip={epic.name}>
            {epic.state && <EpicStateIcon state={epic.state} />}
            <EpicName className={epic.id === '0' && 'italic'}>{epic.name}</EpicName>
          </CheckItem>
        ))}

        <HidenEpicsHeader onClick={() => setShowHiden(!showHidden)}>
          <span className="mr-2">{t('story.otherEpics')}</span>
          {showHidden ? <CaretDownFilled /> : <CaretRightFilled />}
        </HidenEpicsHeader>

        <ItemsContainer style={{ height: showHidden ? `${epics.filter((epic) => epic.state === 'done').length * 30}px` : 0 }}>
          {showHidden && epics.filter((epic) => epic.state === 'done').map((epic) => (
            <CheckItem key={epic.id} checked={selectedEpicIds.includes(epic.id)} onCheck={(checked) => onCheck(epic.id, checked)} tooltip={epic.name}>
              <EpicStateIcon state={epic.state} />
              <EpicName>{epic.name}</EpicName>
            </CheckItem>
          ))}
        </ItemsContainer>
      </ItemsContainer>
    </div>
  )
}

const ItemsContainer = tw.div`
  overflow-hidden
  transition-all
`

const HidenEpicsHeader = tw.div`
  flex
  items-center
  text-xs
  text-gray-500
  mt-2
  cursor-pointer

  hover:text-gray-900
`

const EpicName = tw.span`
  ml-2
  whitespace-nowrap
  overflow-hidden
  truncate
`
