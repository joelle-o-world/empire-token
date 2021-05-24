import React, {FunctionComponent} from 'react';

import './PurpleFancyButton.sass'

export const PurpleFancyButton: FunctionComponent = ({children}) => {
  return <button className="PurpleFancyButton">
    {children}
  </button>
}

export default PurpleFancyButton
