/* eslint-disable @typescript-eslint/no-misused-promises */
import ListsModal from "./shared/ListsModal";
import * as React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "./shared/Form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";

type FormValues = {
  youtube_id: string,
  title: string,
  description: string
};

const Lists = () => {
  const { register, handleSubmit } = useForm<FormValues>({});

  const { data: lists } = api.example.getLists.useQuery();
  const mutation = api.example.addList.useMutation();

  const addList: SubmitHandler<FormValues> = ({ youtube_id, title, description }) => {
    mutation.mutate({
      description,
      title,
      youtube_id
    });
    closeModal()
  }

  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <div className="flex justify-center px-2">
      <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
        <div className="flex flex-col pb-3">
          <h2 className="my-3 text-2xl font-semibold">Lists</h2>
        </div>

        {lists?.map(list => (
          <div key={list.lst_id} className="flex cursor-pointer flex-col py-3 px-2 hover:bg-gray-100">
            <dd className="text-lg font-semibold">{list.lst_title}</dd>
            <dt className="mb-1 text-gray-500">
              {list.lst_description}
            </dt>
          </div>
        ))}
        <div className="flex justify-end py-8 text-xl font-semibold">
          <button
            onClick={openModal}
            className=" mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Add New List +
          </button>
        </div>
      </dl>

      <ListsModal isOpen={isOpen} onClose={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 mb-6"
        >
          New list
        </Dialog.Title>
        <form onSubmit={handleSubmit(addList)}>
          <div className="mb-6">
            <input
              {...register("youtube_id")}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="https://www.youtube.com/watch?v="
            />
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
              Add List
            </button>
          </div>
        </form>
      </ListsModal>
    </div>
  );
};

export default Lists;
