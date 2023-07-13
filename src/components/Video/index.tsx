import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  PlayToggle,
  Player,
  VolumeMenuButton
} from 'video-react'
import thumbnail from '@assets/video/thumbnail.jpg'
type Props = {
  className?: string
  video: string
}

const Video = (props: Props) => {
  const { className, video } = props
  return (
    <Player
      // width={100}
      // height={100}
      poster={thumbnail}
      autoPlay
      src={video}
      muted={true}
      // aspectRatio="auto"
    >
      {/* <source src={URL.createObjectURL(video)} /> */}
      <LoadingSpinner />
      <ControlBar autoHide={true} disableDefaultControls={true}>
        {/* <ReplayControl seconds={10} />
        <ForwardControl seconds={30} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} /> */}
        <PlayToggle />
        <BigPlayButton position="center" />
        <VolumeMenuButton />
      </ControlBar>
    </Player>
  )
}

export default Video
