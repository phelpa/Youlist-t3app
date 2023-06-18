/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Modal from "../components/Modal";
import * as React from "react";
import { useForm, FormProvider, type SubmitHandler } from "../components/Form";
import type { ClipboardEvent } from 'react'
import { retrieveYoutubeIdFromClipBoard } from './youtubehelper';
import { useConfirm } from '../../pages/confirmContext'
import Input from '../components/Input'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import { DeleteIcon, EditIcon } from '../icons'
import useModalWithForm from '../hooks/useModalWithForm';

type FormValues = {
  title: string,
  description: string
  youtubeId: string,
  videoId: string;
};

const Videos = () => {
  const router = useRouter();
  const listId = router.query.listId as string;

  const { data: videos, refetch } = api.example.getVideos.useQuery(listId)
  const addMutation = api.example.addVideo.useMutation({ onSuccess: () => refetch() });
  const editMutation = api.example.editVideo.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = api.example.deleteVideo.useMutation({ onSuccess: () => refetch() });

  const form = useForm<FormValues>({});
  const { isOpen, openModal, closeModal, type } = useModalWithForm(false, form)
  const confirm = useConfirm();

  const isEdit = type === 'edit';

  const goToAnnotations = (videoId: string, youtubeId: string) => async () => {
    await router.push(`/annotations/${videoId}/${youtubeId}`)
  }

  const onYoutubeUrlPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const ytId = retrieveYoutubeIdFromClipBoard(e)
    if (ytId) {
      form.setValue('youtubeId', ytId)
    }
  }

  const addVideo: SubmitHandler<FormValues> = ({ title, description, youtubeId }) => {
    addMutation.mutate({
      title,
      description,
      youtubeId,
      listId
    });
    closeModal()
  }

  const editVideo: SubmitHandler<FormValues> = ({ videoId, title, description }) => {
    editMutation.mutate({
      videoId,
      description,
      title
    });
    closeModal()
  }

  const openDeleteModal = (videoId: string) => (e?: React.MouseEvent<HTMLElement>) => {
    e && e.stopPropagation()
    confirm({ title: 'Delete Video', description: 'Are you sure you want to delete the video?', onConfirm: () => deleteMutation.mutate(videoId) })
  }

  return (
    <>
      <div className="flex flex-wrap justify-around gap-8 py-4">
        {videos?.map(video => (
          <div key={video.vid_id} className="max-w-sm overflow-hidden rounded shadow-lg">
            <iframe
              className="h-80 w-full"
              title="iframeYoutube"
              src={`https://www.youtube.com/embed/${video.vid_youtube_id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div onClick={goToAnnotations(video.vid_id, video.vid_youtube_id)} className="pl-6 py-4 cursor-pointer hover:bg-gray-100">
              <div className="text-lg font-semibold flex items-center justify-between pb-2">
                <div className="mb-2 text-xl font-bold">{video.vid_title}</div>
                <div className='flex'>
                  <IconButton onClick={openModal('edit', { title: video.vid_title, description: video.vid_description, videoId: video.vid_id, youtubeId: video.vid_youtube_id })}><EditIcon /></IconButton>
                  <IconButton onClick={openDeleteModal(video.vid_id)}><DeleteIcon /></IconButton>
                </div>
              </div>
              <p className="text-base text-gray-700">
                {video.vid_description}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-10">
          <button
            onClick={openModal('add')}
            className="text-xl font-semibold mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Add New Video +
          </button>

        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h3 className="text-xl font-medium leading-6 text-gray-900 mb-6">
          {isEdit ? 'Edit Video' : 'New Video'}
        </h3>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(isEdit ? editVideo : addVideo)}>
            <div className="mb-6">
              <Input
                name='youtubeId'
                legend='Youtube Id'
                placeholder="youtube.com/watch?v="
                onPaste={onYoutubeUrlPaste}
              />
              <span className='text-xs'>Paste the youtube url to get the id</span>
            </div>
            <div className="mb-6">
              <Input
                name='title'
                legend='Title'
              />
            </div>
            <div className="mb-6">
              <Input
                name='description'
                legend='Description'
              />
            </div>
            <div className="mt-4 flex">
              <Button type='submit'>
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default Videos;
