import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import { useState } from 'react'
import { ProjectFilter } from './ProjectFilter'
import { EpicFilter } from './EpicFilter'
import { StateFilter } from './StateFilter'

export function Filter({ selectedProjectIds, selectedEpicIds, selectedStates, onProjectIdsChange, onEpicIdsChange, onStatesChange }) {
  const { t } = useTranslation()
  const [filtersExpanded, setFilterExpanded] = useState(false)
  const [projectExpanded, setProjectExpanded] = useState(true)
  const [epicExpanded, setEpicExpanded] = useState(false)
  const [stateExpanded, setStateExpanded] = useState(true)

  return (
    <Container>
      <FilterAreaTitle onClick={() => {
        setFilterExpanded(!filtersExpanded)
        setProjectExpanded(!filtersExpanded)
        setEpicExpanded(!filtersExpanded)
        setStateExpanded(!filtersExpanded)
      }}
      >
        <Typography.Title level={5} style={{ marginBottom: '0', marginRight: '0.5rem' }}>{t('general.filters')}</Typography.Title>
        {filtersExpanded ? <CaretDownFilled className="expandIcon" /> : <CaretRightFilled className="expandIcon" />}
      </FilterAreaTitle>

      <ProjectFilter selectedProjectIds={selectedProjectIds} onSelectionChange={onProjectIdsChange} expanded={projectExpanded} onExpandedChange={setProjectExpanded} />
      <EpicFilter selectedEpicIds={selectedEpicIds} onSelectionChange={onEpicIdsChange} expanded={epicExpanded} onExpandedChange={setEpicExpanded} />
      <StateFilter selectedStates={selectedStates} onSelectionChange={onStatesChange} expanded={stateExpanded} onExpandedChange={setStateExpanded} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterAreaTitle = styled.div`
  display: flex;
  align-items: center;

  & .expandIcon {
    color: gray;
  }

  &:hover {
    cursor: pointer;

    & .expandIcon {
      color: black;
    }
  }
`
