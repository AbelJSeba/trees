export function VirtualPC() {
  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono">
      {/* DOS Header */}
      <div className="bg-blue-800 text-white px-2 py-1 text-sm">
        MS-DOS Prompt - Virtual PC
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-2">
          <div>Microsoft Windows [Version 3.1.1]</div>
          <div>(c) 2024 Virtual PC Emulator. All rights reserved.</div>
          <div className="mt-4">C:\{'>'}_</div>
        </div>
        
        {/* Fake Terminal Input */}
        <div className="mt-8 text-center text-gray-500">
          <p className="mb-4">Virtual PC DOS Emulator</p>
          <p className="text-sm">Type 'help' for commands (coming soon)</p>
          
          <div className="mt-8 inline-block border-2 border-green-400 p-4 animate-pulse">
            <div className="text-2xl mb-2">💾</div>
            <div>Insert Disk</div>
          </div>
        </div>
      </div>
    </div>
  );
}