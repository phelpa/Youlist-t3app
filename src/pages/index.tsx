import ListsModal from "./shared/ListsModal";
import * as React from "react";

const Lists = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex justify-center px-2">
      <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
        <div className="flex flex-col pb-3">
          <h2 className="my-3 text-2xl font-semibold">Lists</h2>
        </div>

        <div className="flex cursor-pointer flex-col py-3 px-2 hover:bg-gray-100">
          <dd className="text-lg font-semibold">Documentários Universo</dd>
          <dt className="mb-1 text-gray-500">
            Grandes documentários do universo, esses documentários abrangem os
            mistérios que nos atingem
          </dt>
        </div>
        <div className="flex cursor-pointer flex-col px-2 py-3 hover:bg-gray-100">
          <dd className="text-lg font-semibold">Músicas Pop</dd>
          <dt className="mb-1 text-gray-500">Músicas populares</dt>
        </div>
        <div className="flex cursor-pointer flex-col px-2 py-3 hover:bg-gray-100">
          <dd className="text-lg font-semibold">Programaçao funcional</dd>
          <dt className="mb-1 text-gray-500">
            Vídeos de explicações dos melhores professores de harvard sobre
            programação
          </dt>
        </div>
        <div className="flex justify-end py-8 text-xl font-semibold">
          <button
            onClick={openModal}
            className=" mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Add New List +
          </button>
        </div>
      </dl>
      <ListsModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default Lists;
