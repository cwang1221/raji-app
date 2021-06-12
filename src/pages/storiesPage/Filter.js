import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import { useState } from 'react'
import { ProjectFilter } from './ProjectFilter'
import { EpicFilter } from './EpicFilter'
import { StateFilter } from './StateFilter'

export function Filter() {
  const { t } = useTranslation()
  const [filtersExpanded, setFilterExpanded] = useState(false)
  const [selectedProjectIds, setSelectedProjectIds] = useState([])
  const [selectedEpicIds, setSelectedEpicIds] = useState([])
  const [selectedStates, setSelectedStates] = useState([])

  return (
    <Container>
      <FilterAreaTitle onClick={() => setFilterExpanded(!filtersExpanded)}>
        <Typography.Title level={5} style={{ marginBottom: '0', marginRight: '0.5rem' }}>{t('general.filters')}</Typography.Title>
        {filtersExpanded ? <CaretDownFilled className="expandIcon" /> : <CaretRightFilled className="expandIcon" />}
      </FilterAreaTitle>

      <ProjectFilter selectedProjectIds={selectedProjectIds} onSelectionChange={setSelectedProjectIds} />
      <EpicFilter selectedEpicIds={selectedEpicIds} onSelectionChange={setSelectedEpicIds} />
      <StateFilter selectedStates={selectedStates} onSelectionChange={setSelectedStates} />
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
