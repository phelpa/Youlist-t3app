import { useRouter } from "next/router";

const Videos = () => {
  const router = useRouter();
  const { listId } = router.query;
  return (
    <div className="flex  flex-wrap	justify-around gap-8 py-4">
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <iframe
          className="h-80 w-full"
          title="iframeYoutube"
          src={`https://www.youtube.com/embed/__ctaHuS2LI`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <iframe
          className="h-80 w-full"
          title="iframeYoutube"
          src={`https://www.youtube.com/embed/SFTcLYYBOmQ`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <iframe
          className="h-80 w-full"
          title="iframeYoutube"
          src={`https://www.youtube.com/embed/1tRQDpEO8U4`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>

      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <iframe
          className="h-80 w-full"
          title="iframeYoutube"
          src={`https://www.youtube.com/embed/AQSNS-bN-8Y`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Videos;
