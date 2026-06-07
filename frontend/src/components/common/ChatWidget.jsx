import { useState, useRef, useEffect } from 'react';
import contactService from '../../services/contactService';

const BOT_INTRO = { from: 'bot', text: 'Hi! 👋 I\'m the TechFlow assistant. Ask me anything or leave your details and we\'ll get back to you.' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('chat'); // chat | collect
  const [form, setForm] = useState({ name: '', email: '' });
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const addMsg = (from, text) => setMessages((p) => [...p, { from, text }]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMsg('user', trimmed);
    setInput('');

    if (step === 'collect-name') {
      setForm((f) => ({ ...f, name: trimmed }));
      setStep('collect-email');
      setTimeout(() => addMsg('bot', 'Got it! What\'s your email address?'), 400);
      return;
    }
    if (step === 'collect-email') {
      const emailForm = { ...form, name: form.name, email: trimmed };
      setForm(emailForm);
      setStep('collect-msg');
      setTimeout(() => addMsg('bot', 'Perfect! Briefly describe your question or project.'), 400);
      return;
    }
    if (step === 'collect-msg') {
      setSending(true);
      try {
        await contactService.submitContact({ ...form, subject: 'Live Chat Inquiry', message: trimmed });
        addMsg('bot', '✅ Thanks! Your message was sent. Our team will reach out to you shortly.');
      } catch {
        addMsg('bot', '⚠️ Oops, something went wrong. Please try the contact form instead.');
      } finally {
        setSending(false);
        setStep('chat');
        setForm({ name: '', email: '' });
      }
      return;
    }

    // Simple keyword matching
    const lower = trimmed.toLowerCase();
    setTimeout(() => {
      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        addMsg('bot', 'Our plans start at ₹499/month. Check the Pricing section on the homepage for full details!');
      } else if (lower.includes('docker')) {
        addMsg('bot', 'TechFlow ships pre-built multi-stage Dockerfiles for both Node.js and React apps. 🐳');
      } else if (lower.includes('aws') || lower.includes('ecs') || lower.includes('fargate')) {
        addMsg('bot', 'We support AWS ECS Fargate deployments with ALB path routing out of the box. ☁️');
      } else if (lower.includes('contact') || lower.includes('talk') || lower.includes('human')) {
        addMsg('bot', 'Sure! Let me collect your details. What\'s your name?');
        setStep('collect-name');
      } else {
        addMsg('bot', 'Great question! Want to leave your details so our team can follow up? Just say "contact" to start.');
      }
    }, 450);
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSend(); };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chat-widget-btn btn-saas-primary d-flex align-items-center justify-content-center"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
      >
        <i className={`bi ${open ? 'bi-x-lg' : 'bi-chat-dots-fill'} fs-5`}></i>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="chat-widget-panel saas-card">
          <div className="chat-widget-header d-flex align-items-center gap-2 p-3 border-bottom border-secondary border-opacity-10">
            <div className="rounded-circle bg-success" style={{ width: '8px', height: '8px', boxShadow: '0 0 6px #34d399' }}></div>
            <span className="text-white fw-bold small">TechFlow Support</span>
            <span className="text-gray small ms-auto">Online</span>
          </div>

          <div className="chat-widget-messages p-3 d-flex flex-column gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`d-flex ${m.from === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`chat-bubble ${m.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-top border-secondary border-opacity-10 d-flex gap-2">
            <input
              className="form-control form-input-saas py-2 small"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={sending}
            />
            <button className="btn btn-saas-primary px-3" onClick={handleSend} disabled={sending || !input.trim()}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
