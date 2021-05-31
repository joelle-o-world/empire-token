import React, {FunctionComponent} from 'react';
import {IoPlaySharp} from 'react-icons/io5'

import './PlayButton.sass';
import PlayButtonHalo from '../img/PlayButtonHalo.png';

interface PlayButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PlayButton: FunctionComponent<PlayButtonProps> = ({onClick}) => {
  return <div className="PlayButtonWrapper">
    <img src={PlayButtonHalo} className="PlayButtonHalo" />
    <button 
      onClick={onClick}
      className="PlayButton"
    >
      <IoPlaySharp/>
    </button>
  </div>
}

export default PlayButton
