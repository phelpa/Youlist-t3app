import Annotations from "../shared/Annotations";
import VideoPlayer from "../shared/VideoPlayer";

const Login = () => {
  return (
    <>
      <div className="align-center my-2 flex flex-col items-center">
        <div className="p-2 text-5xl">YouList</div>
        <button className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100">
          Sign In
        </button>

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
