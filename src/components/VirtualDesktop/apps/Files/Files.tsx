import { useState } from 'react';

type SortKey = 'name' | 'date' | 'size' | 'kind';
type SortDirection = 'asc' | 'desc';

interface ProjectItem {
  name: string;
  date: string;
  size: 'Small' | 'Medium' | 'Large';
  kind: string;
}

export function Files() {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const projects: ProjectItem[] = [
    { name: 'Portfolio Website', date: 'Dec 15, 2024', size: 'Large', kind: 'Web Development' },
    { name: 'Weather App', date: 'Nov 28, 2024', size: 'Small', kind: 'Mobile Apps' },
    { name: 'E-commerce Platform', date: 'Nov 10, 2024', size: 'Large', kind: 'Web Development' },
    { name: 'Task Manager', date: 'Oct 22, 2024', size: 'Medium', kind: 'Mobile Apps' },
    { name: 'Brand Identity System', date: 'Oct 5, 2024', size: 'Medium', kind: 'Design' },
    { name: 'Neural Network Visualizer', date: 'Sep 18, 2024', size: 'Large', kind: 'AI/ML Projects' },
    { name: 'Open Source CLI Tool', date: 'Sep 3, 2024', size: 'Small', kind: 'Open Source' },
    { name: 'Data Analysis Dashboard', date: 'Aug 20, 2024', size: 'Medium', kind: 'Research' },
    { name: 'Mobile Game', date: 'Aug 5, 2024', size: 'Large', kind: 'Mobile Apps' },
    { name: 'UI Component Library', date: 'Jul 25, 2024', size: 'Medium', kind: 'Open Source' },
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let comparison = 0;
    
    switch (sortKey) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'size':
        const sizeOrder = { 'Small': 1, 'Medium': 2, 'Large': 3 };
        comparison = sizeOrder[a.size] - sizeOrder[b.size];
        break;
      case 'kind':
        comparison = a.kind.localeCompare(b.kind);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const sidebarItems = [
    { name: 'Recents' },
    { name: 'Applications' },
    { name: 'Desktop' },
    { name: 'Documents' },
    { name: 'Downloads' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-[52px] bg-gradient-to-b from-[#f6f6f6] to-[#e7e7e7] border-b border-[#bdbdbd] px-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-black/5 rounded" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 14L9 10L13 6" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 14L11 10L7 6" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[13px] font-medium text-[#3c3c3c]">Projects</span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[180px] h-[22px] px-5 py-0 bg-white/80 border border-[#c8c8c8] rounded-[4px] text-[11px] placeholder:text-[#8e8e93] focus:outline-none focus:ring-2 focus:ring-[#0051d5] focus:border-transparent"
          />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute left-1.5 top-1/2 -translate-y-1/2">
            <circle cx="5" cy="5" r="3.5" stroke="#8e8e93" strokeWidth="1.2"/>
            <path d="M7.5 7.5L10 10" stroke="#8e8e93" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-[200px] bg-[#f5f5f7] border-r border-[#d1d1d1]">
          <div className="p-2">
            <div className="text-[11px] font-medium text-[#86868b] uppercase tracking-wide px-2 py-1">Favorites</div>
            <div className="mt-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  className="w-full text-left px-2 py-1 hover:bg-[#e2e2e4] rounded-[4px] flex items-center gap-2 text-[13px] text-[#1d1d1f]"
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List View */}
        <div className="flex-1 flex flex-col">
          {/* Column Headers */}
          <div className="h-[22px] bg-gradient-to-b from-[#fafafa] to-[#e8e8e8] border-b border-[#d1d1d1] flex items-center text-[11px] font-medium text-[#1d1d1f]">
            <button
              onClick={() => handleSort('name')}
              className="flex-1 px-3 h-full flex items-center gap-1 hover:bg-black/5 border-r border-[#d1d1d1]"
            >
              <span>Name</span>
              {sortKey === 'name' && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path 
                    d={sortDirection === 'asc' ? "M4.5 2L7 6H2L4.5 2Z" : "M4.5 7L2 3H7L4.5 7Z"} 
                    fill="#6e6e73"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleSort('date')}
              className="w-[140px] px-3 h-full flex items-center gap-1 hover:bg-black/5 border-r border-[#d1d1d1]"
            >
              <span>Date Modified</span>
              {sortKey === 'date' && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path 
                    d={sortDirection === 'asc' ? "M4.5 2L7 6H2L4.5 2Z" : "M4.5 7L2 3H7L4.5 7Z"} 
                    fill="#6e6e73"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleSort('size')}
              className="w-[100px] px-3 h-full flex items-center gap-1 hover:bg-black/5 border-r border-[#d1d1d1]"
            >
              <span>Size</span>
              {sortKey === 'size' && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path 
                    d={sortDirection === 'asc' ? "M4.5 2L7 6H2L4.5 2Z" : "M4.5 7L2 3H7L4.5 7Z"} 
                    fill="#6e6e73"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleSort('kind')}
              className="w-[150px] px-3 h-full flex items-center gap-1 hover:bg-black/5"
            >
              <span>Kind</span>
              {sortKey === 'kind' && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path 
                    d={sortDirection === 'asc' ? "M4.5 2L7 6H2L4.5 2Z" : "M4.5 7L2 3H7L4.5 7Z"} 
                    fill="#6e6e73"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-auto bg-white">
            {sortedProjects.map((project, index) => (
              <div
                key={project.name}
                onClick={() => setSelectedItem(project.name)}
                className={`
                  h-[22px] flex items-center text-[13px] cursor-default
                  ${selectedItem === project.name 
                    ? 'bg-[#0051d5] text-white' 
                    : index % 2 === 0 
                      ? 'bg-white hover:bg-[#f0f0f0]' 
                      : 'bg-[#f8f8f8] hover:bg-[#f0f0f0]'
                  }
                `}
              >
                <div className="flex-1 px-3 flex items-center gap-2">
                  <img 
                    src="/icons/folder.svg" 
                    width="16" 
                    height="16" 
                    alt="Folder"
                  />
                  <span className={selectedItem === project.name ? 'text-white' : 'text-[#1d1d1f]'}>
                    {project.name}
                  </span>
                </div>
                <div className={`w-[140px] px-3 ${selectedItem === project.name ? 'text-white' : 'text-[#86868b]'}`}>
                  {project.date}
                </div>
                <div className={`w-[100px] px-3 ${selectedItem === project.name ? 'text-white' : 'text-[#86868b]'}`}>
                  {project.size}
                </div>
                <div className={`w-[150px] px-3 ${selectedItem === project.name ? 'text-white' : 'text-[#86868b]'}`}>
                  {project.kind}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}