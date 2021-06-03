import React, {FunctionComponent} from 'react';

import './SocialMediaIcon.sass'

export interface SocialMediaIconProps {
  url?: string; 
  img: string;
  alt: string;
}

export const SocialMediaIcon: FunctionComponent<SocialMediaIconProps> = ({img, url, alt}) => {
  return <a href={url} target="blank" className="SocialMediaIcon">
    <img src={img} alt={alt} />
  </a>
}
