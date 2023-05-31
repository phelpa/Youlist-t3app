/* eslint-disable @typescript-eslint/no-misused-promises */
import Modal from "./shared/Modal";
import * as React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "./shared/Form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import { useRouter } from 'next/router'
import useModalWithForm from './hooks/useModalWithForm';

import { useConfirm } from '../pages/confirmContext'

type FormValues = {
  title: string,
  description: string
  listId: string
};

const EditIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
}

const DeleteIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
}

type IconButtonProps = {
  children: React.ReactNode;
  [x: string]: unknown;
}

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return <button {...rest} type="button" className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    {children}
  </button>
}

const Lists = () => {
  const form = useForm<FormValues>({});
  const { isOpen, openModal, closeModal, type } = useModalWithForm(false, form)
  const { confirm } = useConfirm()

  const isEdit = type === 'edit';

  const router = useRouter()

  const { data: lists, refetch } = api.example.getLists.useQuery();
  const addMutation = api.example.addList.useMutation({ onSuccess: () => refetch() });
  const editMutation = api.example.editList.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = api.example.deleteList.useMutation({ onSuccess: () => refetch() });

  const goToList = (listId: string) => async () => {
    await router.push(`/list/${listId}`)
  }

  const addList: SubmitHandler<FormValues> = ({ title, description }) => {
    addMutation.mutate({
      description,
      title
    });
    closeModal()
  }

  const editList: SubmitHandler<FormValues> = ({ listId, title, description }) => {
    editMutation.mutate({
      listId,
      description,
      title
    });
    closeModal()
  }

  const deleteList = (listId: string) => {
    deleteMutation.mutate(listId);
  }

  const openOtherDeleteModal = (listId: string) => (e?: React.MouseEvent<HTMLElement>) => {
    e && e.stopPropagation()
    confirm({ title: 'Delete List', description: 'Are you sure you want to delete the list?', onConfirm: () => deleteList(listId) })
  }

  return (
    <div className="flex justify-center px-2">
      <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
        <div className="flex flex-col pb-3">
          <h2 className="my-3 text-2xl font-semibold">Lists</h2>
        </div>
        {lists?.map(list => (
          <div onClick={goToList(list.lst_id)} key={list.lst_id} className="flex cursor-pointer flex-col py-3 px-2 hover:bg-gray-100">
            <dd className="text-lg font-semibold flex items-center justify-between">
              <span>{list.lst_title}</span>
              <div className='flex'>
                <span><IconButton onClick={openModal('edit', { title: list.lst_title, description: list.lst_description, listId: list.lst_id })}><EditIcon /></IconButton></span>
                <span><IconButton onClick={openOtherDeleteModal(list.lst_id)}><DeleteIcon /></IconButton></span>
              </div>
            </dd>
            <dt className="mb-1 text-gray-500">
              {list.lst_description}
            </dt>
          </div>
        ))}
        <div className="flex justify-end py-8">
          <button
            onClick={openModal('add')}
            className="text-xl font-semibold mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Add New List +
          </button>
        </div>
      </dl>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 mb-6"
        >
          {isEdit ? 'Edit List' : 'New List'}
        </Dialog.Title>

        <form onSubmit={form.handleSubmit(isEdit ? editList : addList)}>
          <div className="mb-6">
            <input
              {...form.register("title")}
              type="text"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Title"
            />
          </div>
          <div className="mb-6">
            <input
              {...form.register("description")}
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
              {isEdit ? 'Edit List' : 'Add List'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Lists;
