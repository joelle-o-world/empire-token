import React, {FunctionComponent,    useRef,  useState,  cloneElement, useEffect} from 'react';
import classNames from 'classnames';

import './CardCarousel.sass'
import {LittleButtons} from './LittleButtons';

const standardWidth = 343
const expandedWidth = 397

export interface CardCarouselProps {
}

export const CardCarousel: FunctionComponent<CardCarouselProps> = ({
  children
}) => {
  const numberOfPages = React.Children.count(children);
  const [focussedCardIndex, setFocussedCardIndex] = useState(0)

  const slidesRef = useRef(null as null|HTMLUListElement)
  const focusCard = (i: number) => {
    let slides = slidesRef.current
    if(slides) {
      let card = slides.childNodes[i];
      if(card && card instanceof HTMLElement) {
        let {left} = card.getBoundingClientRect();
        let targetLeft = window.innerWidth/2 - expandedWidth/2
        if(i > focussedCardIndex)
          targetLeft += expandedWidth - standardWidth
        slides.scrollTo({
          left:slides.scrollLeft -targetLeft + left,
          behavior: 'smooth'
        })
      }
    }
  }

  useEffect(() => focusCard(1) , [])

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
    <ul className="CardCarouselSlides" onScroll={handleScroll} ref={slidesRef}>
    {
      React.Children.map(children, (child, i) => {
        if(React.isValidElement(child)) {
          let className = child.props.className
          if(i === focussedCardIndex)
            className = classNames(className, 'InFocus')

          return cloneElement(child, {
            className,
            onClick: () => focusCard(i),
          })

        } else return child
      })
    }
    </ul>
    <LittleButtons 
      numberOfButtons={numberOfPages}
      current={focussedCardIndex}
      onClick={i => focusCard(i)}
    />
  </div>
}

export default CardCarousel;

export const Card: FunctionComponent<{className?:string; onClick?: () => void}> = ({children, className, onClick}) => {

  return <li className={classNames("CardCarouselCard", className)} onClick={onClick}>
    {children}
  </li>
}
