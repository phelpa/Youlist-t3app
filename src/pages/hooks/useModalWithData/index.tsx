import * as React from 'react'

type Obj = {
    [x: string]: unknown
}

function useModal<T = Obj>(bool: boolean): [isOpen: boolean, openModal: (data: T) => () => void, closeModal: () => void, data: T] {
    const [isOpen, setIsOpen] = React.useState(bool);
    const [data, setData] = React.useState<T>();

    const openModal = (data: T) => (e?) => {
        e && e.stopPropagation()
        setData(data)
        setIsOpen(true)
    }

    const closeModal = () => {
        setData(undefined)
        setIsOpen(false)
    }

    return [isOpen, openModal, closeModal, data as T]
}

export default useModal;