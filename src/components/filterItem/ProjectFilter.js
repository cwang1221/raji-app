import { CaretDownOutlined, CaretRightOutlined, RocketOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Input, Menu } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useProject } from '../../hooks'
import { FilterItemBase } from './FilterItem'

export function ProjectFilter({ onChange, registerFilter }) {
  const { t } = useTranslation()
  const { getProjects } = useProject()
  const [showAll, setShowAll] = useState(true)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [shownText, setShownText] = useState(t('filterBar.all'))
  const [selectedProjects, setSelectedProjects] = useState(['all'])
  const searchBoxRef = useRef()

  registerFilter({
    id: 'project',
    clear: () => setSelectedProjects(['all'])
  })

  useEffect(async () => {
    const data = await getProjects()
    setProjects(data)
    setFilteredProjects(data)
  }, [])

  const onPopupVisibleChange = (visible) => {
    if (!visible) {
      searchBoxRef?.current?.setValue('')
      setFilteredProjects(projects)
      setShowAll(true)
    }
  }

  useEffect(() => {
    if (selectedProjects.includes('all')) {
      setShownText(t('filterBar.all'))
    } else if (selectedProjects.length === 1) {
      setShownText(projects.find((item) => `${item.id}` === selectedProjects[0]).name)
    } else {
      setShownText(t('filterBar.countProjects', { count: selectedProjects.length }))
    }
    onChange && onChange({
      id: 'project',
      items: selectedProjects
    })
  }, [selectedProjects])

  const onSelect = ({ key, selectedKeys }) => {
    if (key === 'all') {
      setSelectedProjects(['all'])
    } else {
      const indexOfAll = selectedKeys.indexOf('all')
      indexOfAll > -1 && selectedKeys.splice(indexOfAll, 1)
      setSelectedProjects(selectedKeys)
    }
  }

  const onDeselect = ({ selectedKeys }) => {
    if (!selectedKeys.length) {
      setSelectedProjects(['all'])
    } else {
      setSelectedProjects(selectedKeys)
    }
  }

  const onFilterProjects = (e) => {
    const filterText = e.currentTarget.value.toLowerCase()
    if (filterText) {
      setFilteredProjects(projects.filter((item) => item.name.toLowerCase().includes(filterText)))
      setShowAll(false)
    } else {
      setFilteredProjects(projects)
      setShowAll(true)
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const onClear = (e) => {
    stopPropagation(e)
    setSelectedProjects(['all'])
  }

  const Popup = () => (
    <div>
      <FilterPopup as={Card} onClick={(e) => stopPropagation(e)}>
        <span style={{ fontSize: '10px' }}>{t('filterBar.projectHint')}</span>
        <Input.Search ref={searchBoxRef} onChange={onFilterProjects} />
        <Menu multiple selectedKeys={selectedProjects} onSelect={onSelect} onDeselect={onDeselect} style={{ borderRight: '0px' }}>
          {showAll && <Menu.Item key="all">{t('filterBar.allProjects')}</Menu.Item>}
          {filteredProjects.map((project) => (
            <Menu.Item key={`${project.id}`} icon={<CaretRightOutlined style={{ color: project.color }} />}>{project.name}</Menu.Item>
          ))}
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <FilterItemBase name={t('milestones.projects')}>
      <Dropdown overlay={Popup} trigger={['click']} onVisibleChange={onPopupVisibleChange}>
        <Button>
          <RocketOutlined />
          {shownText}
          {selectedProjects.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon as={StopOutlined} onClick={onClear} />}
        </Button>
      </Dropdown>
    </FilterItemBase>
  )
}

const FilterPopup = styled.div`
  width: 18rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`

const ClearIcon = styled.div`
  color: rgb(198, 107, 107);

  &:hover {
    color: darkred;
  }
`
