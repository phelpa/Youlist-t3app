import * as React from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form';

function useModalWithForm<T extends FieldValues>(bool: boolean, form: UseFormReturn<T, any>) {
    const [isOpen, setIsOpen] = React.useState(bool);
    const [type, setType] = React.useState<'add' | 'edit'>();

    const closeModal = () => {
        form.reset();
        setIsOpen(false);
    }

    const openModal = (type: 'add' | 'edit', formValues?: T) => (e) => {
        e.stopPropagation()
        if (type === 'add') {
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

