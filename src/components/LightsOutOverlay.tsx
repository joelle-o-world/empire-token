import React, {FunctionComponent} from 'react'
import './LightsOutOverlay.sass'
import classNames from 'classnames'

export const LightsOutOverlay: FunctionComponent<{active?:boolean}> = ({children, active=false}) => {
  return <div className={ classNames(
    "LightsOutOverlay", 
    active ? 'isVisible' : 'isHidden'
  )}>
    {children}
  </div>
}

export default LightsOutOverlay
