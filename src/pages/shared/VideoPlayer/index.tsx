import YouTube from "react-youtube";
import type { YouTubeEvent, YouTubePlayer } from "react-youtube";

interface IProps {
  youtubeId: string;
  className?: string;
}

declare global {
  interface Window {
    youtubePlayer: YouTubePlayer;
  }
}

const VideoPlayer = ({ youtubeId, className }: IProps) => {
  const makeYouTubePlayer = (e: YouTubeEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    window.youtubePlayer = e.target;
  };

  return (
    <YouTube
      className={`my-4 ${className ?? ""}`}
      id="videoplayer"
      iframeClassName="w-full h-[50vh] lg:h-[70vh]"
      videoId={youtubeId}
      opts={{}}
      onReady={makeYouTubePlayer}
    />
  );
};

export default VideoPlayer;
