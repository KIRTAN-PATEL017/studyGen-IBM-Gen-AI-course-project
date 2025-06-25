import React from 'react';
import { BookOpen, Copy, Download } from 'lucide-react';

interface NotesProps {
  notes: string[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  const copyToClipboard = () => {
    const notesText = notes.map((note, index) => `${index + 1}. ${note}`).join('\n\n');
    navigator.clipboard.writeText(notesText);
  };

  const downloadNotes = () => {
    const notesText = notes.map((note, index) => `${index + 1}. ${note}`).join('\n\n');
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold">Key Notes</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={downloadNotes}
            className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Download notes"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-zinc-800/50 rounded-lg"
          >
            <span className="flex-shrink-0 text-green-400 font-semibold">
              {index + 1}.
            </span>
            <p className="text-gray-300 leading-relaxed">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;