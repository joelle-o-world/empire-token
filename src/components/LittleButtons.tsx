import * as React from 'react';
import {FunctionComponent} from 'react';

import {FaCircle} from 'react-icons/fa';
import './LittleButtons.sass'

export interface LittleButtonsProps {
  numberOfButtons: number,
  current: number,
  onClick?: (index:number) => void,
}

export const LittleButtons: FunctionComponent<LittleButtonsProps> = ({
  numberOfButtons,
  current,
  onClick
}) => {
  let buttons = [];
  for(let i=0; i < numberOfButtons; ++i)
    buttons.push(
      <span className="LittleButtonWrapper" onClick={() => onClick && onClick(i)} key={i}>
        <FaCircle className={`LittleButton ${current === i ? "current" : "not-current"}`} />
      </span>
    )

  return <div className="LittleButtons">{buttons}</div>
}
