import { useMemo, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Minus,
  Plus,
  FileText
} from 'lucide-react';
import { cn } from '../../../../utils';

interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  body: string;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'forest-journal',
    title: 'Forest Journal',
    subtitle: 'Daily reflections from the canopy',
    updatedAt: 'Updated 1 day ago',
    body: [
      'Among the redwoods the hours feel elastic—slow breaths of resin and filtered light.',
      'Each project in this digital grove is another ring in the trunk: a record of curiosity, collaboration, and care.',
      'These notes help me remember how the work should feel: warm to the touch, patient, and grounded in craft.'
    ].join('\n\n')
  },
  {
    id: 'design-language',
    title: 'Design Language Notes',
    subtitle: 'Interface motifs & typography',
    updatedAt: 'Updated 3 days ago',
    body: [
      'Typography anchors the interface. I keep returning to pragmatic sans-serifs paired with confident display faces.',
      'Interactions should echo physical materials—window chrome, embossed buttons, tactile toggles—without becoming nostalgia traps.',
      'Palette lives in muted greens, fogged whites, and warm copper accents. They mirror the forest floor: moss, light, bark.'
    ].join('\n\n')
  },
  {
    id: 'release-notes',
    title: 'Release Notes',
    subtitle: 'Creations desktop updates',
    updatedAt: 'Updated 1 week ago',
    body: [
      '— Added virtual desktop power controls with gentle transitions.',
      '— Introduced project launcher icons with hover states inspired by macOS Aqua.',
      '— Document workspace prototype ready for the TextEdit experience.'
    ].join('\n\n')
  }
];

const TOOLBAR_BUTTON_BASE =
  'inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent transition-colors';

export function TextEdit() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [activeId, setActiveId] = useState<string>(INITIAL_DOCUMENTS[0].id);
  const activeDocument = useMemo(
    () => documents.find((doc) => doc.id === activeId) ?? documents[0],
    [activeId, documents]
  );

  const handleBodyChange = (event: React.FormEvent<HTMLDivElement>) => {
    const nextText = event.currentTarget.innerText;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeId ? { ...doc, body: nextText } : doc
      )
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#f4f5f7] text-[#1f1f24]">
      {/* Document toolbar */}
      <div className="flex h-11 items-center justify-between border-b border-[#d8d8dc] bg-white px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f4f8] text-[#6b7280]">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">
              {activeDocument.title}
            </p>
            <p className="text-xs text-[#6b7280]">
              {activeDocument.updatedAt}
            </p>
          </div>
        </div>

      </div>

      {/* Formatting toolbar */}
      <div className="flex h-11 items-center justify-between border-b border-[#d8d8dc] bg-[#fafafa] px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'w-auto gap-1 rounded-md bg-white px-3 text-xs font-medium text-[#1f1f24] shadow-sm ring-1 ring-[#d0d0d4]'
            )}
          >
            Body
            <Minus className="h-3 w-3" />
          </button>
          <div className="mx-1 h-6 w-px bg-[#d4d4d8]" />
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <Underline className="h-4 w-4" />
          </button>
          <div className="mx-1 h-6 w-px bg-[#d4d4d8]" />
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <AlignRight className="h-4 w-4" />
          </button>
          <div className="mx-1 h-6 w-px bg-[#d4d4d8]" />
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-[#4b5563] hover:bg-white hover:text-[#111827]'
            )}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(
              TOOLBAR_BUTTON_BASE,
              'text-xs font-medium text-[#4b5563] hover:bg-white'
            )}
          >
            85%
          </button>
          <div className="flex rounded-md border border-[#d4d4d8]">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center text-[#4b5563] hover:bg-white"
            >
              <Minus className="h-3 w-3" />
            </button>
            <div className="flex h-7 w-10 items-center justify-center border-x border-[#d4d4d8] text-xs font-medium text-[#1f1f24]">
              1.0
            </div>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center text-[#4b5563] hover:bg-white"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Document list */}
        <aside className="w-64 border-r border-[#d8d8dc] bg-[#f9fafb]">
          <div className="border-b border-[#e4e4e8] px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
              Documents
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-3">
            <div className="space-y-1">
              {documents.map((doc) => {
                const isActive = doc.id === activeDocument.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveId(doc.id)}
                    className={cn(
                      'w-full rounded-lg px-3 py-2 text-left transition-colors',
                      isActive
                        ? 'bg-[#1f2937] text-white shadow-sm'
                        : 'text-[#1f1f24] hover:bg-white'
                    )}
                  >
                    <p className="text-sm font-medium">{doc.title}</p>
                    <p
                      className={cn(
                        'text-xs',
                        isActive ? 'text-white/80' : 'text-[#6b7280]'
                      )}
                    >
                      {doc.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Editor surface */}
        <div className="relative flex flex-1 justify-center overflow-auto bg-gradient-to-br from-[#f1f4f8] via-[#eff4fa] to-[#f6f7fb] px-8 py-6">
          <div className="flex w-full max-w-[760px] flex-col rounded-2xl border border-[#e4e6eb] bg-white shadow-[0_45px_120px_-60px_rgba(19,30,58,0.45)]">
            <div className="border-b border-[#ededf2] px-10 pb-4 pt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9ca3af]">
                {activeDocument.subtitle}
              </p>
              <h1 className="mt-2 font-serif text-3xl text-[#1f1f24]">
                {activeDocument.title}
              </h1>
            </div>
            <div className="flex-1 px-10 py-8">
              <div
                key={activeDocument.id}
                contentEditable
                suppressContentEditableWarning
                onInput={handleBodyChange}
                className="min-h-[420px] whitespace-pre-wrap text-[15px] leading-7 text-[#2a2a31] focus:outline-none"
              >
                {activeDocument.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
