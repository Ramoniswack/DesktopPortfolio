import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="p-8 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let's discuss your next project or just say hello
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-6 text-white">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/60 text-white border-2 border-transparent focus:border-sky-400 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/60 text-white border-2 border-transparent focus:border-sky-400 focus:outline-none transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-gray-900/60 text-white border-2 border-transparent focus:border-sky-400 focus:outline-none transition-all"
                  placeholder="Subject (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Message *
                </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-gray-900/60 text-white border-2 border-transparent focus:border-sky-400 focus:outline-none transition-all min-h-[120px]"
                  placeholder="Type your message..."
                  />
              </div>
              <button
                type="submit"
                disabled={!isFormValid || status === 'sending'}
                className="w-full py-3 px-6 rounded-lg font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-base flex items-center justify-center"
              >
                {status === 'sending' ? (
                  <>
                    <Send className="animate-spin mr-2" size={18} /> Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="text-green-400 mr-2" size={18} /> Sent!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="text-red-400 mr-2" size={18} /> Error
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} /> Send
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-white"
          >
            <h2 className="text-xl font-bold mb-6">
              Contact Info
              </h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                <Mail size={20} className="text-sky-400" />
                <span className="text-gray-200">ramontiwari086@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                <User size={20} className="text-sky-400" />
                <span className="text-gray-200">R.a.mohan Tiwari</span>
                </div>
                <div className="flex items-center space-x-3">
                <MessageSquare size={20} className="text-sky-400" />
                <span className="text-gray-200">Available for freelance & full-time</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;