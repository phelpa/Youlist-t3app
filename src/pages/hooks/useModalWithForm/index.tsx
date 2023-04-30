import * as React from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form';

function useModalWithForm<T extends FieldValues>(bool: boolean, form: UseFormReturn<T, any>) {
    const [isOpen, setIsOpen] = React.useState(bool);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        form.reset();
        setIsOpen(false);
    }

    const updateForm = (formValues: T) => (e) => {
        e.stopPropagation()
        Object.entries(formValues).forEach(([key, value]) => form.setValue(key, value))
        openModal()
    }

    return { isOpen, openModal, closeModal, updateForm }
}

export default useModalWithForm

