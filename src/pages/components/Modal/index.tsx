import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

type MyModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const MyModal = ({ onClose, isOpen, children }: MyModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default MyModal;