import Annotations from "./shared/Annotations";
import VideoPlayer from "./shared/VideoPlayer";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: sessionData } = useSession();

  console.log(sessionData, "oia so");

  return (
    <>
      {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      <div className="align-center my-2 flex flex-col items-center">
        <div className="p-2 text-5xl">YouList</div>
        <a
          onClick={sessionData ? () => void signOut() : () => void signIn()}
          rel="noopener nofollow noreferrer"
          className="hover:text-black-700 mr-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-900 hover:cursor-pointer hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="mr-2 h-4 w-4"
          >
            <defs>
              <path
                id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              />
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
            <path
              clipPath="url(#b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            />
          </svg>
          {sessionData ? "Sign Out" : "Sign in with Google"}
        </a>
        <div className="container">
          <div className="grid grid-cols-12">
            <VideoPlayer
              youtubeId="kBdfcR-8hEY"
              className="col-span-12 lg:col-span-6 lg:col-start-2"
            />
            <Annotations className="col-span-12 lg:col-span-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
