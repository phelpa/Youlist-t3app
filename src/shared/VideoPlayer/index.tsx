import YouTube from "react-youtube";

interface IProps {
  youtubeId: string;
}

declare global {
  interface Window {
    youtubePlayer: any;
  }
}

const VideoPlayer = ({ youtubeId }: IProps) => {
  const makeYouTubePlayer = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    window.youtubePlayer = e.target;
  };

  return (
    <YouTube
      className="my-4"
      id="videoplayer"
      videoId={youtubeId}
      opts={{}}
      onReady={makeYouTubePlayer}
    />
  );
};

export default VideoPlayer;
