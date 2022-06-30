import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoApp = (props) => {

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: props.url,
        type: "video/mp4"
      }
    ],
    poster: "https://res.cloudinary.com/xuanhust/image/upload/v1656555977/samples/WebFiml/Op-ket-thuc-1-game4v-1645151815-49_dtpjpq.jpg"
  };

  const optionSrc = {
    controls: ["rewind", "play", "fast-forward", "progress", "current-time", "duration", "mute", "volume", "settings", "fullscreen"]
  }

  return (
    <Plyr source={videoSrc} options={optionSrc} />
  )
}

export default VideoApp;
