import React, {FunctionComponent,    useRef,  useState,  cloneElement} from 'react';
import classNames from 'classnames';

import './CardCarousel.sass'
import {LittleButtons} from './LittleButtons';

export interface CardCarouselProps {
}

export const CardCarousel: FunctionComponent<CardCarouselProps> = ({
  children
}) => {
  const numberOfPages = React.Children.count(children);
  const [focussedCardIndex, setFocussedCardIndex] = useState(0)


  const handleDoneScrolling = (e:any) => {
    const div = e.nativeEvent.target as HTMLDivElement
    if(div) {
      let midpoint = div.clientWidth / 2
      let winner=0;
      let winnerDist = Infinity;
      for(let i=0; i < div.childNodes.length; ++i) {
        let card = div.childNodes[i];
        if(card instanceof Element) {
          const {left, right} = card.getBoundingClientRect();
          let dist = Math.abs(midpoint - (left+right)/2)
          if(dist < winnerDist) {
            winner = i
            winnerDist = dist
          }
        }
      }

      setFocussedCardIndex(winner)
    }
  }

  const scrollTimerRef = useRef(null as null|ReturnType<typeof setTimeout>)
  const handleScroll = (e:any) => {
    if(scrollTimerRef.current !== null)
      clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      handleDoneScrolling(e)
    }, 50)
  }

  return <div className="CardCarousel" >
    <ul className="CardCarouselSlides" onScroll={handleDoneScrolling}>
    {
      React.Children.map(children, (child, i) => {
        if(React.isValidElement(child) && i === focussedCardIndex) {
          console.log('HEERE', i, child);
          let className = classNames(
            child.props.className,
            'InFocus'
          )
          return cloneElement(child, {className})

        } else return child
      })
    }
    </ul>
    <LittleButtons 
      numberOfButtons={numberOfPages}
      current={focussedCardIndex}
    />
  </div>
}

export default CardCarousel;

export const Card: FunctionComponent<{className?:string}> = ({children, className}) => {

  return <li className={classNames("CardCarouselCard", className)}>
    {children}
  </li>
}
