export function PhotoBooth() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-black">
      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">📸</div>
        <h2 className="text-2xl font-bold text-white mb-2">Photos</h2>
        <p className="text-gray-400 text-center max-w-md mb-6">
          Photos coming soon! View and edit your creative images.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="aspect-video bg-gray-700 rounded flex items-center justify-center">
            <span className="text-gray-500">Camera Preview</span>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
            Take Photo
          </button>
        </div>
      </div>
    </div>
  );
}