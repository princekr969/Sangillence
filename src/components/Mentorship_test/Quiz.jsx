
export default function Quiz({ data, index, total, onAns }) {
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="bg-black/50 rounded-3xl border border-gray-400 p-4 sm:p-6 md:p-8 h-auto min-h-[400px] sm:min-h-[450px] md:min-h-[510px] w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center sm:justify-start mb-4 sm:mb-6">
        <img
          src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png"
          alt="Sangillence"
          className="h-10 sm:h-12 md:h-14 lg:h-16 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        />
      </div>

      {/* Progress Tracker */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="text-sm sm:text-base text-gray-300 font-medium mb-2">
          Question {index + 1} of {total}
        </div>
        <div className="w-full h-2 sm:h-2.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 sm:mb-6 md:mb-8 break-words">
        {data.text}
      </h2>

      {/* Scale Buttons */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => onAns(data.id, v)}
              className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-600 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl font-outfit"
            >
              {v}
            </button>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-400 uppercase tracking-wider px-1">
          <span>Never</span>
          <span>Always</span>
        </div>
      </div>
    </div>
  );
}