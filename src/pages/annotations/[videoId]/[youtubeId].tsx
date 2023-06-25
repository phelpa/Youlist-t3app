/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router"
import YouTube from 'react-youtube'
import * as React from 'react'
import { useForm } from '../../../components/Form'
import type { SubmitHandler } from "../../../components/Form";
import { api } from "../../../utils/api";
import IconButton from '../../../components/IconButton'
import { DeleteIcon, EditIcon } from '../../../components/icons'
import { useConfirm } from '../../../components/confirmContext'
import { useProgressBar } from '../../../components/progressBarContext';

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

const EVENT = 'mousedown';

const useClickAway = (ref: any, callback: any) => {

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener(EVENT, listener);
    return () => {
      document.removeEventListener(EVENT, listener);
    };
  }, [ref, callback]);
};

type FormValues = {
  text: string;
};

const Annotations = () => {
  const router = useRouter();
  const { youtubeId } = router.query;
  const videoId = router.query.videoId as string

  const [currentTime, setCurrentTime] = React.useState("0:00");

  const { data: annotations, refetch, isInitialLoading } = api.example.getAnnotations.useQuery(videoId)
  const addMutation = api.example.addAnnotation.useMutation({ onSuccess: () => refetch() });
  const editMutation = api.example.editAnnotation.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = api.example.deleteAnnotation.useMutation({ onSuccess: () => refetch() });

  const { register, handleSubmit, setValue } = useForm<FormValues>({});
  const confirm = useConfirm();

  const progressBar = useProgressBar()
  progressBar(addMutation.isLoading || editMutation.isLoading || deleteMutation.isLoading || isInitialLoading)

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

  type AnnotationState = {
    isAnnotationHovered: string;
    isAnnotationBeingEdited: string;
    textBeingEdited: string;
  }

  type AnnotationReducer = (prevState: AnnotationState, nextState: Partial<AnnotationState>) => AnnotationState;

  const [{ isAnnotationHovered, isAnnotationBeingEdited, textBeingEdited }, updateAnnotation] = React.useReducer<AnnotationReducer>((prev, next) => ({ ...prev, ...next }), {
    isAnnotationHovered: '',
    isAnnotationBeingEdited: '',
    textBeingEdited: ''
  })

  const textAreaRef = React.useRef<any>()

  useClickAway(textAreaRef, () => {
    const storedAnnotation = annotations?.find(item => item.ant_id === isAnnotationBeingEdited)
    if (storedAnnotation?.ant_text === textBeingEdited) {
      updateAnnotation(({ isAnnotationBeingEdited: '', textBeingEdited: '' }))
    }
  });

  const onEnterPressEdit = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      editMutation.mutate({ text: textBeingEdited, antId: isAnnotationBeingEdited })
      updateAnnotation({ isAnnotationBeingEdited: '' })
    }
  }

  const onEnterPressSubmit = async (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      await handleSubmit(addAnnotation)();
    }
  }

  const openDeleteModal = (antId: string) => (e?: React.MouseEvent<HTMLElement>) => {
    e && e.stopPropagation()
    confirm({
      title: 'Delete Annotation', description: 'Are you sure you want to delete the annotation?', onConfirm: () => deleteMutation.mutate(antId),
    })
  }

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
            <div
              className="flex gap-2 items-center hover:bg-gray-100 p-1 rounded-md min-h-[2.6rem]"
              key={ant_id}
              onMouseEnter={() => updateAnnotation({ isAnnotationHovered: ant_id })}
              onMouseLeave={() => updateAnnotation({ isAnnotationHovered: '' })}>
              <span
                className="text-lg text-gray-500 hover:cursor-pointer hover:underline"
                onClick={() => goToSpecificTime(ant_videotime)}
              >
                {fancyTimeFormat(ant_videotime)}
              </span>
              <div className='flex justify-between items-center w-full'>
                {isAnnotationBeingEdited === ant_id ?
                  <textarea
                    ref={textAreaRef}
                    value={textBeingEdited}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900"
                    onChange={(e) => updateAnnotation({ textBeingEdited: e.target.value })}
                    onKeyDown={onEnterPressEdit}
                    rows={1}
                  /> :
                  <span className="text-lg">{ant_text}</span>
                }
                {isAnnotationHovered === ant_id && !isAnnotationBeingEdited && <div className='flex'>
                  <IconButton onClick={() => updateAnnotation({ isAnnotationBeingEdited: ant_id, textBeingEdited: ant_text })}><EditIcon /></IconButton>
                  <IconButton onClick={openDeleteModal(ant_id)}><DeleteIcon /></IconButton>
                </div>}
              </div>
            </div>
          ))}
          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
              {currentTime}
            </div>
            <textarea
              {...register("text")}
              rows={1}
              onClick={setMinuteAndSecond}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-14 text-sm text-gray-900 mt-2"
              placeholder="Type and hit enter"
              onKeyDown={onEnterPressSubmit}
            />
          </div>
        </div>
      </div>
    </>)
}

export default Annotations