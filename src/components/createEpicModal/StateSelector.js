import { Dropdown, Menu } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { EpicStateIcon } from '../epicStateIcon'
import { MyCard } from '../myCard'

export function StateSelector({ state, onStateChange, style }) {
  const { t } = useTranslation()
  const statesRef = useRef(['todo', 'inProgress', 'done'])

  const Popup = () => (
    <div>
      <PopupContainer>
        <PopupHeader>
          <span style={{ fontSize: '12px' }}>{t('epic.updateEpicState')}</span>
        </PopupHeader>
        <Menu selectedKeys={[state]} onSelect={({ key }) => onStateChange(key)} style={{ borderRight: '0' }}>
          {statesRef.current.map((item) => (
            <Menu.Item key={`${item}`} icon={<EpicStateIcon state={item} />}>
              {t(`epic.${item}`)}
            </Menu.Item>
          ))}
        </Menu>
      </PopupContainer>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Button style={style}>
        <Title>{t('general.state')}</Title>
        <Text>{t(`epic.${state}`)}</Text>
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
