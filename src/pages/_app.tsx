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
import { useEffect, useState } from 'react';

const ProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
    } else {
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 200);
    }

    return () => {
      clearInterval(interval);
      clearTimeout();
    };
  }, [isLoading]);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div className="w-full h-1 bg-gray-200 rounded">
      <div
        className="h-full bg-gray-900 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};



const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <SessionProvider session={session}>
      {Component?.publicRoute ? (
        <Component {...pageProps} />
      ) : (
        <Auth>
          <ConfirmProvider>
            <ProgressBar isLoading={loading} />
            <button onClick={() => setLoading(!loading)}>Chama loading</button>
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
