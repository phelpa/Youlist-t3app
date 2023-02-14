/* eslint-disable @typescript-eslint/restrict-plus-operands */
import * as React from "react";

const Annotations = () => {
  const videoId = 123;
  const [annotations, setAnnotations] = React.useState([
    { video_id: videoId, text: "Click to move to this time", videotime: 200 },
    { video_id: videoId, text: "Great question", videotime: 500 },
  ]);

  const fancyTimeFormat = (duration: number) => {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  return (
    <div className="p-4">
      {annotations.map(({ video_id, text, videotime }) => (
        <div className="my-2 flex gap-2" key={video_id}>
          <span className="text-slate-500">{fancyTimeFormat(videotime)}</span>
          <span>{text}</span>
        </div>
      ))}

      <label
        htmlFor="input-group-1"
        className="my-1 mt-4 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Annotation
      </label>
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
          0:00
        </div>
        <input
          type="text"
          id="input-group-1"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-14 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Type and hit enter"
        />
      </div>
    </div>
  );
};

export default Annotations;
