/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router"
import YouTube from 'react-youtube'
import * as React from 'react'
import { useForm } from '../../components/Form'
import type { SubmitHandler } from "../../components/Form";
import { api } from "../../../utils/api";
import IconButton from '../../components/IconButton'
import { DeleteIcon, EditIcon } from '../../icons'

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

type FormValues = {
  text: string;
};

const Annotations = () => {
  const router = useRouter();
  const { youtubeId } = router.query;
  const videoId = router.query.videoId as string

  const [currentTime, setCurrentTime] = React.useState("0:00");

  const { data: annotations, refetch } = api.example.getAnnotations.useQuery(videoId)
  const addMutation = api.example.addAnnotation.useMutation({ onSuccess: () => refetch() });

  const { register, handleSubmit, setValue } = useForm<FormValues>({});

  const addAnnotation: SubmitHandler<FormValues> = ({ text }, e) => {
    const presentTime = window["youtubePlayer"]?.getCurrentTime?.() as number;

    e?.preventDefault();
    addMutation.mutate({
      text,
      videotime: presentTime,
      videoId
    })
    setValue("text", "")
  };

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

  const onStageChange = () => {
    const presentTime = window["youtubePlayer"]?.getCurrentTime?.();
    const minute = fancyTimeFormat(presentTime as number);
    setCurrentTime(minute);
  };

  const [isAnnotationHovered, setIsAnnotationHovered] = React.useState('')

  const handleHoveredAnnotations = (ant_id?: string) => () => {
    ant_id ? setIsAnnotationHovered(ant_id) : setIsAnnotationHovered('')
  }

  console.log(isAnnotationHovered, 'isAnnotationHovered')
  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 py-4 ">
        <div className='w-full sm:w-[60%]'>
          <YouTube
            className="h-[60vh] sm:h-[90vh] w-full"
            iframeClassName="h-full w-full"
            id="videoplayer"
            videoId={youtubeId as string}
            onStateChange={onStageChange}
            opts={{}}
            onReady={makeYouTubePlayer}
          />
        </div>
        <div className="w-[100%] sm:w-[30%] mx-4">
          {annotations?.map(({ ant_id, ant_videotime, ant_text }) => (
            <div className="flex gap-2 items-center hover:bg-gray-100 p-1 rounded-md min-h-[2.6rem]" key={ant_id} onMouseEnter={handleHoveredAnnotations(ant_id)} onMouseLeave={handleHoveredAnnotations()}>
              <span
                className="text-lg text-gray-500 hover:cursor-pointer hover:underline"
                onClick={() => goToSpecificTime(ant_videotime)}
              >
                {fancyTimeFormat(ant_videotime)}
              </span>
              <div className='flex justify-between items-center w-full'>
                <span className="text-lg">{ant_text}</span>
                {isAnnotationHovered === ant_id && <div className='flex'>
                  <IconButton className='scale-75'><EditIcon className='scale-125' /></IconButton>
                  <IconButton className='scale-75'><DeleteIcon className='scale-125' /></IconButton>
                </div>}
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit(addAnnotation)}>
            <div className="relative mb-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                {currentTime}
              </div>
              <input
                {...register("text")}
                onClick={setMinuteAndSecond}
                type="text"
                id="input-group-1"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-14 text-sm text-gray-900 mt-2"
                placeholder="Type and hit enter"
              />
            </div>
          </form>
        </div>
      </div>
    </>)
}

export default Annotations