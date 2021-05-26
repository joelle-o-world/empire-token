import React, {FunctionComponent} from 'react';

import './PurpleFancyButton.sass'

interface PurpleFancyButtonProps {
  onClick?: () => void
}
export const PurpleFancyButton: FunctionComponent<PurpleFancyButtonProps> = ({children, onClick}) => {
  return <button onClick={onClick} className="PurpleFancyButton">
    {children}
  </button>
}

export default PurpleFancyButton
