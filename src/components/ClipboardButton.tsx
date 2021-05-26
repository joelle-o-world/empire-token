import React from 'react';
import {FunctionComponent, useCallback, useState, useRef} from 'react';

import './ClipboardButton.sass';
import PurpleFancyButton from './PurpleFancyButton';

export const ClipboardButton:FunctionComponent<{name: string; toCopy: string|null}> = ({toCopy, name}) => {
  const [copied, setCopied] = useState(false)

  const inputRef = useRef(null as null|HTMLInputElement)

  const handleClick = useCallback(() => {
    let input = inputRef.current
    if(input) {
      input.focus();
      input.select();

      try {
        let successful = document.execCommand('copy')
        console.log(successful);
        if(successful)
          setCopied(true)
        else
          throw new Error("Unable to copyn text")
      } catch(e) {
        console.error('unable to copy text');
      }
    }
  }, []);

  if(toCopy)
    return <div className='ClipboardButton'>
      <input className='address' ref={inputRef} value={toCopy} onChange={() => null} />
      <PurpleFancyButton onClick={handleClick}>{!copied ? "Copy" : "Copied"}</PurpleFancyButton>
    </div>

  else
    return <div className='ClipboardButton work-in-progress'>
      <h3 className="node-name">{name}</h3>
      <button disabled className='copybtn'>WORK IN PROGRESS</button>
    </div>
};
