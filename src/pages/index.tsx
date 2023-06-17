/* eslint-disable @typescript-eslint/no-misused-promises */
import Modal from "./components/Modal";
import * as React from "react";
import { useForm, FormProvider, type SubmitHandler } from "./components/Form";
import { api } from "../utils/api";
import { useRouter } from 'next/router'
import { useConfirm } from '../pages/confirmContext'
import useModalWithForm from './hooks/useModalWithForm';
import Input from './components/Input'
import Button from './components/Button'
import IconButton from './components/IconButton'
import { DeleteIcon, EditIcon } from './icons'

type FormValues = {
  title: string,
  description: string
  listId: string
}

const Lists = () => {
  const form = useForm<FormValues>({});
  const { isOpen, openModal, closeModal, type } = useModalWithForm(false, form)
  const confirm = useConfirm()

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

  const openDeleteModal = (listId: string) => (e?: React.MouseEvent<HTMLElement>) => {
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
          <div onClick={goToList(list.lst_id)} key={list.lst_id} className="flex cursor-pointer flex-col py-3 px-2 hover:bg-gray-100 min-w-[300px]">
            <dd className="text-lg font-semibold flex items-center justify-between">
              <span>{list.lst_title}</span>
              <div className='flex'>
                <IconButton onClick={openModal('edit', { title: list.lst_title, description: list.lst_description, listId: list.lst_id })}><EditIcon /></IconButton>
                <IconButton onClick={openDeleteModal(list.lst_id)}><DeleteIcon /></IconButton>
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
        <h3 className="text-xl font-medium leading-6 text-gray-900 mb-6">
          {isEdit ? 'Edit List' : 'New List'}
        </h3>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(isEdit ? editList : addList)}>
            <div className="mb-6">
              <Input
                name='title'
                legend="Title"
              />
            </div>
            <div className="mb-6">
              <Input
                name='description'
                legend="Description"
              />
            </div>
            <div className="mt-4 flex">
              <Button
                type='submit'
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default Lists;
