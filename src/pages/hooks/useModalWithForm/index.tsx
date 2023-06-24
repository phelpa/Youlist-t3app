/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react'
import type { FieldValues, UseFormReturn } from '../../../components/Form'

function useModalWithForm<T extends FieldValues>(bool: boolean, form: UseFormReturn<T, any>) {
  const [isOpen, setIsOpen] = React.useState(bool);
  const [type, setType] = React.useState<'add' | 'edit'>();

  const closeModal = () => {
    form.reset();
    setIsOpen(false);
  }

  const openModal = (type: 'add' | 'edit', formValues?: T) => (e?: React.MouseEvent<HTMLElement>) => {
    e && e.stopPropagation()
    if (type === 'add') {
      form.reset();
      setIsOpen(true);
      setType('add')
      return
    }
    Object.entries(formValues).forEach(([key, value]) => form.setValue(key, value))
    setIsOpen(true);
    setType('edit')
  }

  return { isOpen, openModal, closeModal, type }
}

export default useModalWithForm
