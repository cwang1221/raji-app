import { Menu, Layout } from 'antd'
import { DashboardOutlined, TeamOutlined, ReadOutlined, FlagOutlined, BlockOutlined, BarChartOutlined, TagOutlined, RocketOutlined, SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export function SideMenu() {
  const { t } = useTranslation()

  return (
    <Layout.Sider>
      <Menu mode="inline" theme="dark">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}> {t('sideMenu.dashboard')} </Menu.Item>
        <Menu.Item key="status" icon={<TeamOutlined />}> {t('sideMenu.status')} </Menu.Item>
        <Menu.Item key="stories" icon={<ReadOutlined />}> {t('sideMenu.stories')} </Menu.Item>
        <Menu.Item key="epics" icon={<FlagOutlined />}> {t('sideMenu.epics')} </Menu.Item>
        <Menu.Item key="milestones" icon={<BlockOutlined />}> {t('sideMenu.milestones')} </Menu.Item>
        <Menu.Item key="reports" icon={<BarChartOutlined />}> {t('sideMenu.reports')} </Menu.Item>
        <Menu.Item key="labels" icon={<TagOutlined />}> {t('sideMenu.labels')} </Menu.Item>
        <Menu.Item key="projects" icon={<RocketOutlined />}> {t('sideMenu.projects')} </Menu.Item>
        <Menu.Item key="search" icon={<SearchOutlined />}> {t('sideMenu.search')} </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}
