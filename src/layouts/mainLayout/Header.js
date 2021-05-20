import { Layout, Avatar, Button, Input, Dropdown, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logoTransparent.png'
import { useAuth } from '../../contexts/authContext'
import { useLanguageContext } from '../../contexts/languageContext'
import styles from './Header.module.css'

export function Header() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguageContext()
  const history = useHistory()
  const { auth } = useAuth()

  const onLogout = () => {
    history.push('/signIn')
  }

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.headerGroup}>
        <Avatar shape="square" size={58} src={logo} />
        <Button type="primary" size="large" className={styles.createButton}>{t('header.createStory')}</Button>
        <Input.Search size="large" className={styles.search} />
      </div>
      <div className={styles.headerGroup}>
        <Dropdown
          placement="bottomCenter"
          overlay={(
            <Menu onClick={(e) => changeLanguage(e.key)}>
              <Menu.Item key="en"> English </Menu.Item>
              <Menu.Item key="zh"> 简体中文 </Menu.Item>
            </Menu>
          )}
        >
          <Button size="large" shape="circle" className={styles.button}>{language.toUpperCase()}</Button>
        </Dropdown>
        <Dropdown
          placement="bottomCenter"
          overlay={(
            <Menu>
              <Menu.Item key="logout" onClick={onLogout}> {t('header.logout')} </Menu.Item>
            </Menu>
          )}
        >
          <Avatar size="large" src={auth.avatar} className={styles.avater} />
        </Dropdown>
      </div>
    </Layout.Header>
  )
}
