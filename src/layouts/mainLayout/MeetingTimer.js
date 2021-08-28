import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'antd'
import { useSettingContext } from '../../contexts/settingContext'
import { useSetting } from '../../hooks/useRequest'

let timeInterval

export function MeetingTimer({ onTimeout, clearTimeout }) {
  const [start, setStart] = useState(false)
  const [time, setTime] = useState(0)
  const { setting, setSetting } = useSettingContext()
  const { getSetting } = useSetting()
  const { t } = useTranslation()

  useEffect(async () => {
    if (!setting.timePerTopic) {
      const data = await getSetting()
      setSetting(data)
    }
  }, [])

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
    <div className="flex items-center">
      {start && <Typography.Title level={2} className="m-0">{formatTime(time)}</Typography.Title>}
      {start && <Button type="primary" onClick={onNext} className="mx-4">{t('header.nextTopic')}</Button>}
      <Button onClick={() => setStart(!start)}>{t(start ? 'header.stopMeeting' : 'header.startMeeting')}</Button>
    </div>
  )
}
