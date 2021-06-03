import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import LightsOutOverlay from './LightsOutOverlay';
import PlayButton from './PlayButton'


import ExplainerVideoFile from '../video/sample_video.mp4'
import {IoMdCloseCircle} from 'react-icons/io';

export const ExplainerVideo: FunctionComponent = () => {
  const [showingVideo, setShowingVideo] = useState(false);
  const videoRef = useRef(null as null|HTMLVideoElement)

  const showVideo = () => {
    let video = videoRef.current
    if(video)
      video.play()
    setShowingVideo(true)
  }
  const hideVideo = () => {
    let video = videoRef.current
    if(video)
      video.pause()
    setShowingVideo(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', hideVideo)
    return () => window.removeEventListener('scroll', hideVideo)
  }, [])

  return <div className="ExplainerVideo">
    <LightsOutOverlay active={showingVideo}>
      <button className="CloseVideo CloseButton" onClick={hideVideo}><IoMdCloseCircle/></button>
      <video controls ref={videoRef} src={ExplainerVideoFile} />
    </LightsOutOverlay>
    <PlayButton onClick={showVideo}/>

  </div>
}

export default ExplainerVideo
