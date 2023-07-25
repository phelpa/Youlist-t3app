// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useRouter } from "next/router";
import React from "react";
import { ConfirmProvider, ConfirmModal } from '../components/confirmContext';
import { ProgressBarProvider, ProgressBar } from '../components/progressBarContext';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {Component?.publicRoute ? (
        <Component {...pageProps} />
      ) : (
        <Auth>
          <ConfirmProvider>
            <ProgressBarProvider>
              <ProgressBar />
              <Component {...pageProps} />
              <ConfirmModal />
            </ProgressBarProvider>
          </ConfirmProvider>
        </Auth>
      )}
    </SessionProvider>
  );
};

type AuthProps = { children: React.ReactNode };

function Auth({ children }: AuthProps) {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }

  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  return <>{children}</>;
}

export default api.withTRPC(MyApp);
