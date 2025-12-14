import React, { useState } from 'react';
import { Github, Mail, Eye, Send, Lock, Loader } from 'lucide-react';

const SystemFooter: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };


  return (
    <footer id="contact" className="border-t border-mr-gray/20 bg-mr-black py-12 px-6 md:px-20 lg:px-40 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info Column */}
        <div className="space-y-8">
            <div>
                <h4 className="text-mr-red uppercase tracking-widest text-xs font-bold mb-4">Encrypted Channel</h4>
                <div className="flex flex-col gap-4">
                    <a href="https://github.com/pablaofficeal" className="flex items-center gap-3 text-mr-white hover:text-mr-red transition-colors group">
                        <Github size={20} className="group-hover:animate-pulse" /> 
                        <span>github.com/pablaofficeal</span>
                    </a>
                </div>
            </div>

            <div className="max-w-md border border-mr-gray p-6 relative">
                <div className="absolute -top-3 left-4 bg-mr-black px-2 text-mr-gray text-xs">SECRET_DATA</div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    "В свободное время пишу художественную хоррор-книгу, основанную на реальных событиях."
                </p>
                <div className="flex items-center gap-2 text-xs text-mr-red">
                    <Eye size={14} />
                    <span>Monitoring vulnerabilities...</span>
                </div>
            </div>
        </div>

        {/* API Form */}
        <div className="relative">
            <h4 className="text-mr-red uppercase tracking-widest text-xs font-bold mb-4">
                &gt; Send_Message.exe
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative">
                 {status === 'sending' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-mr-black/80 backdrop-blur-[2px]">
                        <Loader className="text-mr-red animate-spin mb-2" size={24} />
                        <span className="text-mr-white font-bold">TRANSMITTING...</span>
                    </div>
                )}
                {status === 'success' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-mr-black/80 backdrop-blur-[2px]">
                        <span className="text-sys-green font-bold">MESSAGE SENT SUCCESSFULLY</span>
                    </div>
                )}
                {status === 'error' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-mr-black/80 backdrop-blur-[2px]">
                        <span className="text-sys-error font-bold">TRANSMISSION FAILED</span>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-mr-gray">--user-name</label>
                        <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-mr-black border border-mr-gray p-2 text-sm focus:border-mr-red outline-none" placeholder="Mr. Robot" />
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs text-mr-gray">--email</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-mr-black border border-mr-gray p-2 text-sm focus:border-mr-red outline-none" placeholder="elliot@e-corp.com" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-mr-gray">--message-body</label>
                    <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full bg-mr-black border border-mr-gray p-2 text-sm focus:border-mr-red outline-none resize-none" placeholder="Hello friend..." />
                </div>
                <button type="submit" disabled={status === 'sending'} className="bg-mr-white text-mr-black px-6 py-2 font-bold flex items-center gap-2 hover:bg-mr-red hover:text-white transition-colors disabled:opacity-50">
                    <Send size={16} /> EXECUTE
                </button>
            </form>
        </div>

      </div>
      
      <div className="mt-12 pt-6 border-t border-mr-gray/10 text-center md:text-left text-xs text-gray-600 uppercase flex justify-between">
        <span>INIT: 2024</span>
        <span>// END OF LINE</span>
      </div>
    </footer>
  );
};

export default SystemFooter;