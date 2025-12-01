'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: 'welcome', output: 'Welcome to Abhishek Vala\'s Terminal! Type "help" for commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    help: `Available commands:
  - about: Learn about me
  - skills: View technical skills
  - experience: Work experience
  - contact: Get contact information
  - clear: Clear terminal
  - linkedin: Open LinkedIn profile
  - github: Open GitHub profile
  - articles: View Medium articles`,
    about: `DevOps/SRE Engineer with 2+ years of experience
Building resilient, scalable cloud infrastructure
2x AWS Certified | Kubernetes CKA
Passionate about automation and system reliability`,
    skills: `Technical Expertise:
  ☸️  Kubernetes (CKA Certified)
  ☁️  AWS (Solutions Architect)
  🐳 Docker & Containerization
  🏗️  Terraform & IaC
  🔄 CI/CD Pipelines
  📊 Monitoring & Observability`,
    experience: `Current: DevOps/SRE Engineer @ Bankai Infotech
Previous: L3 Engineer @ Motadata
Previous: Implementation Engineer @ Motadata
Previous: Network Administrator @ Yudiz Solutions`,
    contact: `📧 Email: abhishekvala06@gmail.com
🔗 LinkedIn: linkedin.com/in/abhishek-vala
📝 Medium: medium.com/@abhishekvala06
📍 Location: Ahmedabad, Gujarat, India`,
    linkedin: 'Opening LinkedIn profile...',
    github: 'Opening GitHub profile...',
    articles: 'Opening Medium articles...',
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'linkedin') {
      window.open('https://www.linkedin.com/in/abhishek-vala', '_blank');
    } else if (trimmedCmd === 'github') {
      window.open('https://github.com/abhishekvala30', '_blank');
    } else if (trimmedCmd === 'articles') {
      window.open('https://medium.com/@abhishekvala06', '_blank');
    }

    const output = commands[trimmedCmd] || `Command not found: ${cmd}. Type "help" for available commands.`;
    
    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/95 backdrop-blur-xl border-2 border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 overflow-hidden font-mono"
    >
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 px-4 py-2 flex items-center justify-between border-b border-green-500/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-green-400 text-sm">abhishekvala@terminal:~$</div>
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto custom-scrollbar"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="text-green-400">
              <span className="text-blue-400">$</span> {item.command}
            </div>
            <div className="text-gray-300 whitespace-pre-wrap mt-1 ml-4">
              {item.output}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-blue-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="text-green-400 animate-pulse">▊</span>
        </form>
      </div>
    </motion.div>
  );
}