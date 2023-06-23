import * as React from 'react'

type ProgressBarProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProgressBarContext = React.createContext<ProgressBarProps | null>(null);

export type ProgressBarProviderProps = {
  children: React.ReactNode;
};

function ProgressBarProvider({ children }: ProgressBarProviderProps) {
  const [loading, setLoading] = React.useState(false)
  const value = { loading, setLoading }
  return <ProgressBarContext.Provider value={value}>{children}</ProgressBarContext.Provider>;
}

function useProgressBar() {
  const ctx = React.useContext(ProgressBarContext);
  if (!ctx) {
    throw new Error('You must provide a `ProgressBarProvider` in order to use `useProgressBar`');
  }
  return ctx.setLoading;
}

function useProgressBarAllProps() {
  const ctx = React.useContext(ProgressBarContext);
  if (!ctx) {
    throw new Error('You must provide a `ProgressBarProvider` in order to use `useProgressBarAllProps`');
  }
  return ctx;
}

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);

  const { loading: isLoading } = useProgressBarAllProps()

  React.useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;
    let timeout: string | number | NodeJS.Timeout | undefined

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 50) {
            const newProgress = prevProgress + 30;
            return newProgress > 100 ? 100 : newProgress;
          }
          const newProgress = prevProgress + 5;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
    } else {
      setProgress(100);

      timeout = setTimeout(() => {
        setProgress(0);
      }, 200);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div className="w-full h-1 bg-gray-200 rounded absolute">
      <div
        className="h-full bg-gray-900 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};


export { ProgressBar, ProgressBarProvider, useProgressBar } 