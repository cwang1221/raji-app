import { Layout, Avatar, Button, Input, Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import logo from '../../../assets/images/logoSquareTransparent.png'
import { useLanguageContext } from '../../../contexts/languageContext'
import styles from './Header.module.css'
import { UserButton } from './UserButton'

export function Header() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguageContext()

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.headerGroup}>
        <Avatar shape="square" size={48} src={logo} />
        <Button type="primary" className={styles.createButton}>{t('header.createStory')}</Button>
        <Input.Search className={styles.search} placeholder={t('header.searchPlaceholder')} />
      </div>
      <div className={styles.headerGroup}>
        <Dropdown
          placement="bottomRight"
          overlay={(
            <Menu selectedKeys={language} onClick={(e) => changeLanguage(e.key)}>
              <Menu.Item key="en"> English </Menu.Item>
              <Menu.Item key="zh"> 简体中文 </Menu.Item>
            </Menu>
          )}
        >
          <Button size="large" type="primary" icon={<TranslationOutlined />} shape="circle" className={styles.button} />
        </Dropdown>
        <UserButton />
      </div>
    </Layout.Header>
  )
}
