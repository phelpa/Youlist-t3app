import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useRouter } from "next/router";
import React from "react";
import Modal from "./shared/Modal"

export const ConfirmContext = React.createContext(false);


type ConfirmProps = {
  title: string,
  description?: string
  onConfirm: () => void,
  onClose?: () => void
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

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
    setIsOpen(true)
  }

  return (
    <SessionProvider session={session}>
      {Component?.publicRoute ? (
        <Component {...pageProps} />
      ) : (
        <Auth>
          <ConfirmContext.Provider value={isConfirmOpen}>
            <Component {...pageProps} />

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

          </ConfirmContext.Provider>
        </Auth>
      )}
    </SessionProvider>
  );
};

type AuthProps = { children: React.ReactNode };

function Auth({ children }: AuthProps) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div onClick={() => void router.push("/login")}>
        You are unauthenticated, click here to go to Login Page
      </div>
    );
  }

  return <>{children}</>;
}

export default api.withTRPC(MyApp);
