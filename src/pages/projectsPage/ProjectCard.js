import { Button, Space, Typography } from 'antd'
import { FileTextOutlined, BorderlessTableOutlined, EyeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './ProjectCard.module.css'

export function ProjectCard({ indicator, title, description, storyCount, point }) {
  const { t } = useTranslation()
  return (
    <div className={styles.card}>
      <Space align="start">
        <div className={styles.indicator} style={{ backgroundColor: indicator }} />
        <div>
          <Typography.Title level={3} className={styles.title}>{title}</Typography.Title>
          <Typography.Text>{description}</Typography.Text>
          <div>
            <Space size={2} className={styles.footer}>
              <FileTextOutlined /> <span>{storyCount}</span>
              <BorderlessTableOutlined style={{ marginLeft: '1rem' }} /> <span>{point}</span>
              <Button size="small" className={styles.followButton}><EyeOutlined />{t('projects.follow')}</Button>
              <Button size="small" style={{ marginLeft: '1rem' }}>
                <div style={{ backgroundColor: indicator, width: '0.5rem', height: '0.5rem' }} />
              </Button>
            </Space>
          </div>
        </div>
      </Space>
    </div>
  )
}
