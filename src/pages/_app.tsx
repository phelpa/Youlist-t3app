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
            <Component {...pageProps} />
            <ConfirmModal />
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
