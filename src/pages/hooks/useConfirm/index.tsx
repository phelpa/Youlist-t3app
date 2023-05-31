import * as React from 'react'
import Modal from "../../shared/Modal"
import { useContext } from 'react';
import { ConfirmContext } from '../../_app';

type ConfirmProps = {
  title: string,
  description?: string
  onConfirm: () => void,
  onClose?: () => void
}

export default function useConfirm(): [(props: ConfirmProps) => void, () => JSX.Element] {

  const isConfirmOpen = useContext(ConfirmContext);

  console.log(isConfirmOpen, 'isConfirmOpen')

  const [isOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  type voidFunc = { (): void }

  const onConfirmFunctionRef = React.useRef<voidFunc>(() => setIsOpen(false))
  const onCloseFunctionRef = React.useRef<voidFunc>(() => setIsOpen(false))

  const confirmAndClose = () => {
    onConfirmFunctionRef.current()
    setIsOpen(false)
  }

  const confirm = ({ title, description, onConfirm, onClose }: ConfirmProps) => {
    setTitle(title)
    setDescription(description ?? '')
    onConfirmFunctionRef.current = onConfirm;
    if (onClose) {
      onCloseFunctionRef.current = onClose;
    }
    setIsOpen(true)
  }

  const ModalComponent = () => {
    return (
      <Modal isOpen={isOpen} onClose={onCloseFunctionRef.current}>
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">{title}</h3>
        <p>{description}</p>
        <div className="mt-4 flex">
          <button
            type='submit'
            onClick={confirmAndClose}
            className="ml-auto mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            OK
          </button>
        </div>
      </Modal>
    )
  }

  return [confirm, ModalComponent]
}


