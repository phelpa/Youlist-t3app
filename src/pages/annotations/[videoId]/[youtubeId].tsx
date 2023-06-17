/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router"
import YouTube from 'react-youtube'
import * as React from 'react'

const fancyTimeFormat = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600)
  const mins = ~~((duration % 3600) / 60)
  const secs = ~~duration % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

const Annotations = () => {
  const router = useRouter();
  const { videoId, youtubeId } = router.query;
  const [currentTime, setCurrentTime] = React.useState("0:00");


  const annotations = [{ videotime: 32323, text: 'aldair' }]

  const submitAnnotation = (values: any) => {
    const presentTime = window['youtubePlayer']?.getCurrentTime?.()
    console.log(presentTime, 'oia ai')
  }

  const makeYouTubePlayer = (e: any) => {
    window['youtubePlayer'] = e.target
  }

  const goToSpecificTime = (videotime: number) => {
    window['youtubePlayer']?.seekTo?.(videotime)
  }

  const setMinuteAndSecond = () => {
    window?.["youtubePlayer"]?.pauseVideo?.();
    const presentTime = window["youtubePlayer"]?.getCurrentTime?.();
    const minute = fancyTimeFormat(presentTime as number);
    setCurrentTime(minute);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 py-4 ">
        <div className='w-full sm:w-[60%]'>
          <YouTube
            className="h-[60vh] sm:h-[90vh] w-full"
            iframeClassName="h-full w-full"
            id="videoplayer"
            videoId={youtubeId as string}
            opts={{}}
            onReady={makeYouTubePlayer}
          />
        </div>

        <div className="w-[100%] sm:w-[30%] mx-4">
          {annotations?.map((annotation, i) => (
            <div className="flex gap-2 items-center mb-2" key={i}>
              <span
                className="text-lg text-gray-500"
                onClick={() => goToSpecificTime(annotation.videotime)}
              >
                {fancyTimeFormat(annotation.videotime)}
              </span>

              <span className="text-lg">{annotation.text}</span>
            </div>
          ))}
          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
              {currentTime}
            </div>
            <input
              // {...register("text")}
              onClick={setMinuteAndSecond}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-14 text-sm text-gray-900"
              placeholder="Type and hit enter"
            />
          </div>
          <button type="submit" onClick={submitAnnotation} />
        </div>
      </div>
    </>)
}

export default Annotations