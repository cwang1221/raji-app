import { useEffect } from 'react'
import styled from 'styled-components'
import { setHeaderCreateButton } from '../../utils'
import { Filter } from './Filter'

export function StoriesPage() {
  useEffect(() => {
    setHeaderCreateButton('story')
  }, [])

  return (
    <Page>
      <FilterArea>
        <Filter />
      </FilterArea>
      <div />
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const FilterArea = styled.div`
  width: 204px;
`
