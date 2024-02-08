import React from 'react'
import { CustomSelectors } from './CustomSelectors'

import "./Modificators.scss"

export const Modificators = React.memo(({ groups, onModificatorChange }) => {
  return (
    <div className='modificators'>
      {groups.length > 0 && groups.map(group => (
        <React.Fragment key={group.dish_modification_group_id}>
          <CustomSelectors group={group} onModificatorChange={onModificatorChange} />
        </React.Fragment>
      ))}
    </div>
  )
}
)
