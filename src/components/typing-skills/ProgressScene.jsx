const ProgressScene = ({ treeProgress }) => {
  return (
    <div className="relative mx-auto h-[80%] w-full overflow-hidden rounded-2xl border-4 border-amber-800 bg-gradient-to-b from-sky-300 via-sky-200 to-green-300">
      <div className="absolute right-0 bottom-0 left-0 h-14 bg-linear-to-t from-green-700 to-green-500"></div>

      {/* 10%: Cây thông xuất hiện */}
      {treeProgress >= 10 && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{
            opacity: Math.min((treeProgress - 10) / 10, 1),
            transform: `translateX(-50%) translateY(${Math.max(0, 20 - (treeProgress - 10) * 2)}px)`,
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="h-0 w-0 border-r-60 border-b-100 border-l-60 border-r-transparent border-b-green-600 border-l-transparent"></div>
            <div className="-mt-12 h-0 w-0 border-r-50 border-b-80 border-l-50 border-r-transparent border-b-green-500 border-l-transparent"></div>
            <div className="-mt-10 h-0 w-0 border-r-40 border-b-60 border-l-40 border-r-transparent border-b-green-400 border-l-transparent"></div>
            <div className="-mt-2 h-16 w-8 bg-amber-800"></div>
          </div>
        </div>
      )}

      {/* 40%: Mây xuất hiện */}
      {treeProgress >= 40 && (
        <>
          <div
            className="absolute top-16 left-12 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 40) / 10, 1),
              transform: `translateX(${Math.max(0, -30 + (treeProgress - 40))}px)`,
            }}
          >
            <div className="flex items-end">
              <div className="h-12 w-12 rounded-full bg-white"></div>
              <div className="-ml-4 h-16 w-16 rounded-full bg-white"></div>
              <div className="-ml-4 h-14 w-14 rounded-full bg-white"></div>
              <div className="-ml-3 h-10 w-10 rounded-full bg-white"></div>
            </div>
          </div>
          <div
            className="absolute top-8 right-16 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 40) / 10, 1),
              transform: `translateX(${Math.min(0, 30 - (treeProgress - 40))}px)`,
            }}
          >
            <div className="flex items-end">
              <div className="h-10 w-10 rounded-full bg-white"></div>
              <div className="-ml-3 h-14 w-14 rounded-full bg-white"></div>
              <div className="-ml-4 h-12 w-12 rounded-full bg-white"></div>
            </div>
          </div>
        </>
      )}

      {/* 60%: Chim bay */}
      {treeProgress >= 60 && (
        <>
          <div
            className="absolute top-24 left-1/4 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 60) / 10, 1),
              animation:
                treeProgress >= 60 ? 'fly 3s ease-in-out infinite' : 'none',
            }}
          >
            <div className="relative">
              <div className="h-1 w-8 -rotate-12 transform rounded-full bg-gray-800"></div>
              <div className="-mt-1 h-1 w-8 rotate-12 transform rounded-full bg-gray-800"></div>
            </div>
          </div>
          <div
            className="absolute top-32 right-1/3 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 60) / 10, 1),
              animation:
                treeProgress >= 60
                  ? 'fly 3s ease-in-out infinite 0.5s'
                  : 'none',
            }}
          >
            <div className="relative">
              <div className="h-1 w-6 -rotate-12 transform rounded-full bg-gray-800"></div>
              <div className="-mt-1 h-1 w-6 rotate-12 transform rounded-full bg-gray-800"></div>
            </div>
          </div>
        </>
      )}

      {/* 80%: Thỏ trên đất */}
      {treeProgress >= 80 && (
        <div
          className="absolute right-20 bottom-4 transition-all duration-1000"
          style={{
            opacity: Math.min((treeProgress - 80) / 10, 1),
            transform: `translateY(${Math.max(0, 30 - (treeProgress - 80) * 1.5)}px)`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="mb-1 flex gap-2">
              <div className="h-8 w-2 rounded-full border-2 border-pink-400 bg-pink-300"></div>
              <div className="h-8 w-2 rounded-full border-2 border-pink-400 bg-pink-300"></div>
            </div>
            <div className="relative h-10 w-10 rounded-full border-2 border-gray-300 bg-white">
              <div className="absolute top-3 left-2 h-1.5 w-1.5 rounded-full bg-black"></div>
              <div className="absolute top-3 right-2 h-1.5 w-1.5 rounded-full bg-black"></div>
              <div className="absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-pink-400"></div>
            </div>
            <div className="-mt-2 h-8 w-12 rounded-full border-2 border-gray-300 bg-white"></div>
          </div>
        </div>
      )}

      {/* 100%: Mặt trời và hoa */}
      {treeProgress >= 100 && (
        <>
          <div
            className="absolute top-4 right-8 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 95) / 5, 1),
              transform: `scale(${Math.min(1, (treeProgress - 95) / 5)})`,
            }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 shadow-lg shadow-yellow-300/50">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-6 w-1 rounded-full bg-yellow-400"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-32px)`,
                  }}
                ></div>
              ))}
              <div className="absolute top-5 left-4 h-2 w-2 rounded-full bg-orange-600"></div>
              <div className="absolute top-5 right-4 h-2 w-2 rounded-full bg-orange-600"></div>
              <div className="absolute bottom-5 left-1/2 h-2 w-4 -translate-x-1/2 rounded-t-full bg-orange-600"></div>
            </div>
          </div>

          <div
            className="absolute bottom-8 left-16 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 95) / 5, 1),
              transform: `scale(${Math.min(1, (treeProgress - 95) / 5)})`,
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative h-8 w-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-5 w-3 rounded-full bg-pink-400"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-8px)`,
                    }}
                  ></div>
                ))}
                <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400"></div>
              </div>
              <div className="h-6 w-1 bg-green-600"></div>
            </div>
          </div>
          <div
            className="absolute right-24 bottom-8 transition-all duration-1000"
            style={{
              opacity: Math.min((treeProgress - 95) / 5, 1),
              transform: `scale(${Math.min(1, (treeProgress - 95) / 5)})`,
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative h-8 w-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-5 w-3 rounded-full bg-red-400"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-8px)`,
                    }}
                  ></div>
                ))}
                <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400"></div>
              </div>
              <div className="h-6 w-1 bg-green-600"></div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fly {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ProgressScene;
