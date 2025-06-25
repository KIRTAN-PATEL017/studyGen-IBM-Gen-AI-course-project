import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold">StudyGen</span>
        </div>
      </div>
    </header>
  );
};

export default Header;