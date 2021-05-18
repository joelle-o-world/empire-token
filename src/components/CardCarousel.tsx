import React, {FunctionComponent, ReactNode} from 'react';

import './CardCarousel.sass'

export interface CardCarouselProps {
}

export const CardCarousel: FunctionComponent<CardCarouselProps> = ({
  children
}) => {
  return <ul className="CardCarousel">
    {children}
  </ul>
}

export default CardCarousel;

export const Card: FunctionComponent = ({children}) => {
  return <li className="CardCarouselCard">
    {children}
  </li>
}
