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
      <FaCircle className={`LittleButton ${current === i ? "current" : "not-current"}`} key={i} onClick={() => onClick && onClick(i)} />
    )

  return <div className="LittleButtons">{buttons}</div>
}
