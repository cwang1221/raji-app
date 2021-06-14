import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ViewOptionFilter } from './ViewOptionFilter'

export function WorkArea({ title, viewOptions, selectedViewOption, onViewOptionChange, children }) {
  const { t } = useTranslation()

  return (
    <Container>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Filter>
        <span>{t('home.showing')}</span>
        <ViewOptionFilter
          description={t('home.myWorkFilterDescription')}
          viewOptions={viewOptions}
          selectedViewOption={selectedViewOption}
          onViewOptionChange={onViewOptionChange}
        />
      </Filter>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 33%;
  border-radius: 5px;
  box-shadow: 3px 5px 5px #DCDCDC;
  border-bottom: 1px lightgray solid;
  background-color: white;
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`
