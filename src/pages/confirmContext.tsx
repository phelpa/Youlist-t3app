import * as React from 'react';
import Modal from "./shared/Modal"

type ConfirmProps = {
  title: string,
  description?: string
  onConfirm: () => void,
  onClose?: () => void
}

export type ConfirmContextProps = {
  isConfirmOpen: boolean;
  confirmAndClose: () => void;
  confirm: ({ title, description, onConfirm, onClose }: ConfirmProps) => void,
  closeConfirmModal: () => void;
  title: string;
  description: string;
};

const ConfirmContext = React.createContext<ConfirmContextProps | null>(null);

export type ConfirmProviderProps = {
  children: React.ReactNode;
};

function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)

  const closeConfirmModal = () => {
    setIsConfirmOpen(false)
  }

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  type voidFunc = { (): void }

  const onConfirmFunctionRef = React.useRef<voidFunc>(() => setIsConfirmOpen(false))
  const onCloseFunctionRef = React.useRef<voidFunc>(() => setIsConfirmOpen(false))

  const confirmAndClose = () => {
    onConfirmFunctionRef.current()
    setIsConfirmOpen(false)
  }

  const confirm = ({ title, description, onConfirm, onClose }: ConfirmProps) => {
    setTitle(title)
    setDescription(description ?? '')
    onConfirmFunctionRef.current = onConfirm;
    if (onClose) {
      onCloseFunctionRef.current = onClose;
    }
    setIsConfirmOpen(true)
  }

  const value = { isConfirmOpen, confirmAndClose, confirm, closeConfirmModal, title, description }
  return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
}

function useConfirm() {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('You must provide a `ConfirmProvider` in order to use `useConfirm`');
  }
  return ctx;
}

export { ConfirmContext, ConfirmProvider, useConfirm };

export const ConfirmModal = () => {
  const { isConfirmOpen, closeConfirmModal, title, description, confirmAndClose } = useConfirm()
  return (
    <Modal isOpen={isConfirmOpen} onClose={closeConfirmModal}>
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
