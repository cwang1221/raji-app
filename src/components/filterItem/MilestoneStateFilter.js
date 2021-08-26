import { AppstoreFilled } from '@ant-design/icons'
import { useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { MilestoneStateIcon } from '../milestoneStateIcon/MilestoneStateIcon'
import { MultiSelect } from './MultiSelect'

const states = ['todo', 'inProgress', 'done']

export function MilestoneStateFilter({ selectedStates, onChange }) {
  const { t } = useTranslation()
  const statesRef = useRef(states.map((state) => ({
    key: state,
    text: t(`milestone.${state}`),
    icon: <MilestoneStateIcon state={state} />
  })))

  return (
    <MultiSelect
      name={t('milestone.states')}
      icon={<AppstoreFilled className="text-gray-600" />}
      description={t('filterBar.milestoneStateHint')}
      showSearch={false}
      items={statesRef.current}
      allText={t('filterBar.allStates')}
      multipleText={t('milestone.states')}
      selectedKeys={selectedStates}
      onSelectionChange={onChange}
    />
  )
}
