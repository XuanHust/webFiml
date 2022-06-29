import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoApp = (props) => {

    const videoSrc = {
        type: "video",
        sources: [
          {
            // src: "https://res.cloudinary.com/xuanhust/video/upload/v1656496973/samples/WebFiml/onePiece1010_oaupqe.mp4",
            src: props.url,
            type: 'video/webm',
          }
        ]
      };
    // console.log(">>>>", videoSrc)
        
    return(
        <Plyr source={videoSrc}/>
    )
}

export default VideoApp;
