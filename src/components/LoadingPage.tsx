import { useState, useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';

export default function LoadingPage() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Set interval to increment loading percentage until it reaches 100
    const loadingInterval = setInterval(() => {
      setLoadingPercentage((prev) => (prev < 100 ? prev + (100 / 30) : 100)); // Increment by ~3.33% every 100ms
    }, 100);

    if (loadingPercentage >= 100) {
      clearInterval(loadingInterval); // Stop the interval once it reaches 100%
    }

    return () => clearInterval(loadingInterval);
  }, [loadingPercentage]);

  return (
    <div className="flex flex-col justify-end bg-[url('/images/bg.png')] bg-cover flex-1 h-screen">
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <Loader2Icon className="animate-spin text-primary h-12 w-12 mb-6" />
        
        {/* Loading Bar */}
        <div className="relative w-4/5 h-6 bg-gray-600 rounded-full overflow-hidden shadow-lg mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-blue-600 transition-all ease-linear"
            style={{
              width: `${loadingPercentage}%`,
            }}
          />
          {/* Loading Percentage */}
          <div
            className="absolute top-0 left-0 h-full flex items-center justify-center text-white font-bold"
            style={{
              width: '100%',
            }}
          >
            {Math.round(loadingPercentage)}%
          </div>
        </div>
      </div>
    </div>
  );
}
