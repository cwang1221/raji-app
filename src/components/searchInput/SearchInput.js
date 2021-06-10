import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import styled from 'styled-components'

export function SearchInput(props = {}) {
  return (
    <Container>
      <Input {...props} style={{ backgroundColor: 'transparent' }} />
      <SearchIcon />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const SearchIcon = styled(SearchOutlined)`
  color: gray;
  margin-left: -1.5rem;
`
