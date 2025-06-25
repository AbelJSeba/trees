export function Files() {
  const folders = [
    { name: 'Web Development', icon: '🌐' },
    { name: 'Mobile Apps', icon: '📱' },
    { name: 'Design', icon: '🎨' },
    { name: 'AI/ML Projects', icon: '🤖' },
    { name: 'Open Source', icon: '📂' },
    { name: 'Research', icon: '🔬' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-100 rounded" disabled>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 12L6.5 8L10.5 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded" disabled>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 12L9.5 8L5.5 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-1" />
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
        />
      </div>

      {/* Sidebar and Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200 p-2">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">Favorites</div>
          <div className="space-y-1">
            <button className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded text-sm">
              🏠 Home
            </button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded text-sm">
              🖥️ Desktop
            </button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded text-sm">
              📥 Downloads
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-4 gap-4">
            {folders.map((folder) => (
              <button
                key={folder.name}
                className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="text-5xl mb-2">{folder.icon}</div>
                <span className="text-sm">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}