import { AppstoreFilled } from '@ant-design/icons'
import { useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { EpicStateIcon } from '../epicStateIcon/EpicStateIcon'
import { MultiSelect } from './MultiSelect'

const states = ['todo', 'inProgress', 'done']

export function EpicStateFilter({ selectedStates, onChange }) {
  const { t } = useTranslation()
  const statesRef = useRef(states.map((state) => ({
    key: state,
    text: t(`epic.${state}`),
    icon: <EpicStateIcon state={state} />
  })))

  return (
    <MultiSelect
      name={t('epic.epicStates')}
      icon={<AppstoreFilled style={{ color: 'rgb(132, 131, 135)' }} />}
      description={t('filterBar.epicStateHint')}
      showSearch={false}
      items={statesRef.current}
      allText={t('filterBar.allStates')}
      multipleText={t('milestone.states')}
      selectedKeys={selectedStates}
      onSelectionChange={onChange}
    />
  )
}
