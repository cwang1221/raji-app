import { Avatar, Typography } from 'antd'
import styled from 'styled-components'
import { StoryStateIcon, StoryTypeIcon } from '../../components'

export function StoryCard({ id, name, epicName, projectColor, projectName, type, estimate, ownerAvatar }) {
  return (
    <Container>
      <ProjectIndicator color={projectColor} />
      <MainContent>
        <div style={{ padding: '0.5rem' }}>
          <EpicName>{epicName.toLocaleUpperCase()}</EpicName>
          <Typography.Text strong>{name}</Typography.Text>
        </div>
        <Footer>
          <LeftFooter>
            <StoryInfo type={type}>
              <StoryTypeIcon type={type} />
              <StoryId type={type}>#{id}</StoryId>
            </StoryInfo>
          </LeftFooter>
          {ownerAvatar && <Avatar size="small" src={ownerAvatar} />}
        </Footer>
      </MainContent>
    </Container>
  )
}

const Container = styled.div`
  min-width: 20rem;
  display: flex;
  border-radius: 5px;
  height: 6rem;
  margin-bottom: 1rem;
  box-shadow: 3px 5px 5px #DCDCDC;
  border-bottom: 1px lightgray solid;
  background-color: white;

  &:hover {
    transform: translate(-1px,-1px);
  }
`

const ProjectIndicator = styled.div`
  width: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 6rem;
  background-color: ${(props) => (props.color)};
`

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const EpicName = styled.div`
  font-size: 10px;
  color: gray
`

const Footer = styled.div`
  background-color: rgb(249, 249, 249);
  border-bottom-right-radius: 5px;
  height: 37px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

const LeftFooter = styled.div`
  display: flex;
  align-items: center;
`

const StoryInfo = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 0 0.3rem;
  font-size: 12px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'feature':
        return 'rgb(245, 243, 233)'
      case 'bug':
        return 'rgb(245, 235, 235)'
      case 'chore':
      default:
        return 'rgb(235, 238, 242)'
    }
  }};
  height: 20px;
`

const StoryId = styled.div`
  height: 20px;
  margin-left: 0.3rem;
  color: ${({ type }) => {
    switch (type) {
      case 'feature':
        return 'rgb(201, 166, 29)'
      case 'bug':
        return 'rgb(160, 8, 8)'
      case 'chore':
      default:
        return 'rgb(85, 85, 85)'
    }
  }};
`
