import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { useSettingContext } from '../../contexts/settingContext'

let timeInterval

export function MeetingTimer({ onTimeout, clearTimeout }) {
  const [start, setStart] = useState(false)
  const [time, setTime] = useState(0)
  const { setting } = useSettingContext()
  const { t } = useTranslation()

  useEffect(() => {
    if (start) {
      setTimer()
    } else {
      clearInterval(timeInterval)
      clearTimeout()
    }
  }, [start])

  const onNext = () => {
    clearInterval(timeInterval)
    setTimer()
  }

  const setTimer = () => {
    clearTimeout()
    setTime(setting.timePerTopic)
    timeInterval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev - 1
        if (newTime === 0) {
          clearInterval(timeInterval)
        }
        if (newTime === 1) {
          onTimeout()
        }
        return newTime
      })
    }, 1000)
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time - (minutes * 60)

    minutes < 10 && (minutes = `0${minutes}`)
    seconds < 10 && (seconds = `0${seconds}`)
    return `${minutes}:${seconds}`
  }

  return (
    <Container>
      {start && <Typography.Title level={2} style={{ margin: '0' }}>{formatTime(time)}</Typography.Title>}
      {start && <Button type="primary" onClick={onNext} style={{ margin: '0 1rem' }}>{t('header.nextTopic')}</Button>}
      <Button onClick={() => setStart(!start)}>{t(start ? 'header.stopMeeting' : 'header.startMeeting')}</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`
