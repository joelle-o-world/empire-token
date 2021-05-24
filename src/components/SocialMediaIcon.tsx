import React, {FunctionComponent} from 'react';

import './SocialMediaIcon.sass'

export interface SocialMediaIconProps {
  url?: string; 
  img: string;
}

export const SocialMediaIcon: FunctionComponent<SocialMediaIconProps> = ({img, url}) => {
  return <a href={url} className="SocialMediaIcon">
    <img src={img} />
  </a>
}
