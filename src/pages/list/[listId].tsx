/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Modal from "../shared/Modal";
import * as React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "../shared/Form";
import type { SubmitHandler } from "react-hook-form";
import type { ClipboardEvent } from 'react'
import { retrieveYoutubeIdFromClipBoard } from './youtubehelper';

type FormValues = {
  title: string,
  description: string
  youtubeId: string,
};

const Videos = () => {
  const router = useRouter();
  const listId = router.query.listId as string;

  const { data: videos, refetch } = api.example.getVideosWithListId.useQuery(listId)
  const mutation = api.example.addVideoWithListId.useMutation({ onSuccess: () => refetch() });

  const onYoutubeUrlPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const ytId = retrieveYoutubeIdFromClipBoard(e)
    if (ytId) {
      setValue('youtubeId', ytId)
    }
  }
  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const { register, handleSubmit, setValue } = useForm<FormValues>({});

  const addVideo: SubmitHandler<FormValues> = ({ title, description, youtubeId }) => {
    mutation.mutate({
      title,
      description,
      youtubeId,
      listId
    });
    closeModal()
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
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">{video.vid_title}</div>
              <p className="text-base text-gray-700">
                {video.vid_description}
              </p>
            </div>
          </div>

        ))}

        <div className="mt-10">

          <button
            onClick={openModal}
            className="text-xl font-semibold mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Add New Video +
          </button>

        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 mb-6"
        >
          New video
        </Dialog.Title>

        <form onSubmit={handleSubmit(addVideo)}>

          <div className="mb-6">
            <input
              {...register("youtubeId")}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="youtube.com/watch?v="
              onPaste={onYoutubeUrlPaste}
            />
            <span className='text-gray-400 text-xs'>Paste the youtube url to get the id</span>
          </div>

          <div className="mb-6">
            <input
              {...register("title")}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Title"
            />
          </div>

          <div className="mb-6">
            <input
              {...register("description")}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Description"
            />
          </div>

          <div className="mt-4 flex">
            <button
              type='submit'
              className="ml-auto mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              Add Video
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Videos;
