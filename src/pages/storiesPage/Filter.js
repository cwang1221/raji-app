import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { ProjectFilter } from './ProjectFilter'
import { EpicFilter } from './EpicFilter'
import { StateFilter } from './StateFilter'

export function Filter({ selectedProjectIds, selectedEpicIds, selectedStates, onProjectIdsChange, onEpicIdsChange, onStatesChange }) {
  const { t } = useTranslation()
  const [filtersExpanded, setFilterExpanded] = useState(false)
  const [projectExpanded, setProjectExpanded] = useState(true)
  const [epicExpanded, setEpicExpanded] = useState(false)
  const [stateExpanded, setStateExpanded] = useState(true)

  useEffect(() => {
    setFilterExpanded(projectExpanded && epicExpanded && stateExpanded)
  }, [projectExpanded, epicExpanded, stateExpanded])

  return (
    <div className="flex flex-col">
      <FilterAreaTitle onClick={() => {
        setFilterExpanded(!filtersExpanded)
        setProjectExpanded(!filtersExpanded)
        setEpicExpanded(!filtersExpanded)
        setStateExpanded(!filtersExpanded)
      }}
      >
        <Typography.Title level={5} className="mb-0 mr-2">{t('general.filters')}</Typography.Title>
        {filtersExpanded ? <CaretDownFilled className="text-gray-500 group-hover:text-gray-900" /> : <CaretRightFilled className="text-gray-500 group-hover:text-gray-900" />}
      </FilterAreaTitle>

      <ProjectFilter selectedProjectIds={selectedProjectIds} onSelectionChange={onProjectIdsChange} expanded={projectExpanded} onExpandedChange={setProjectExpanded} />
      <EpicFilter selectedEpicIds={selectedEpicIds} onSelectionChange={onEpicIdsChange} expanded={epicExpanded} onExpandedChange={setEpicExpanded} />
      <StateFilter selectedStates={selectedStates} onSelectionChange={onStatesChange} expanded={stateExpanded} onExpandedChange={setStateExpanded} />
    </div>
  )
}

const FilterAreaTitle = tw.div`
  flex
  items-center
  cursor-pointer
  group
`
