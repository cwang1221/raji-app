import { Menu, Layout } from 'antd'
import { DashboardOutlined, TeamOutlined, ReadOutlined, FlagOutlined, BlockOutlined, BarChartOutlined, TagOutlined, RocketOutlined, SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './SideMenu.module.css'

export function SideMenu() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [menuSelectedKey, setMenuSelectedKey] = useState('dashboard')
  const location = useLocation()

  useEffect(() => {
    setMenuSelectedKey(location.pathname.substr(1))
  }, [location])

  const onCollapse = (collapsedParam) => {
    setCollapsed(collapsedParam)
  }

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className={styles.sider}>
      <Menu mode="inline" theme="dark" className={styles.sider} selectedKeys={[menuSelectedKey]}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">{t('sideMenu.dashboard')}</Link>
        </Menu.Item>
        <Menu.Item key="status" icon={<TeamOutlined />}> {t('sideMenu.status')} </Menu.Item>
        <Menu.Item key="stories" icon={<ReadOutlined />}> {t('sideMenu.stories')} </Menu.Item>
        <Menu.Item key="epics" icon={<FlagOutlined />}> {t('sideMenu.epics')} </Menu.Item>
        <Menu.Item key="milestones" icon={<BlockOutlined />}>
          <Link to="/milestones">{t('sideMenu.milestones')}</Link>
        </Menu.Item>
        <Menu.Item key="reports" icon={<BarChartOutlined />}> {t('sideMenu.reports')} </Menu.Item>
        <Menu.Item key="labels" icon={<TagOutlined />}> {t('sideMenu.labels')} </Menu.Item>
        <Menu.Item key="projects" icon={<RocketOutlined />}>
          <Link to="/projects">{t('sideMenu.projects')}</Link>
        </Menu.Item>
        <Menu.Item key="search" icon={<SearchOutlined />}> {t('sideMenu.search')} </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}
