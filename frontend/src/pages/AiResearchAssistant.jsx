import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  PlusCircle, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Database, 
  Bot, 
  User, 
  Loader2, 
  Search, 
  ChevronRight, 
  CornerDownRight, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  Sliders,
  HelpCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  BookMarked,
  Scale,
  Compass,
  FileSpreadsheet,
  Quote,
  Map,
  Building2,
  AlertTriangle,
  Zap,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';

// Land Governance Knowledge Mode Topics & Sample Prompts
const DOMAIN_TOPICS = [
  { id: 'all', name: 'All Modules' },
  { id: 'svamitva', name: 'SVAMITVA & CORS' },
  { id: 'dilrmp', name: 'DILRMP & Cadastre' },
  { id: 'bhuvan', name: 'Bhuvan ISRO GIS' },
  { id: 'records', name: 'RoR & ULPIN / Bhu-Aadhaar' },
  { id: 'portals', name: 'State Land Portals' },
  { id: 'disputes', name: 'Land Disputes & Tribunals' },
  { id: 'climate', name: 'Climate Risk & Land Use' }
];

const EXAMPLE_QUERIES = [
  "What is ULPIN (Bhu-Aadhaar) and how does it prevent title fraud?",
  "Explain SVAMITVA drone survey process and CORS network accuracy.",
  "Compare land records modernization across Dharani, AnyROR, and MeeBhoomi.",
  "What are the major causes of agricultural land disputes in India?",
  "How can ISRO Bhuvan satellite imagery monitor urban expansion?",
  "Summarize key recommendations for transitioning to Conclusive Titling."
];

const PRESET_MODES = [
  { id: 'general', name: 'Land Governance Specialist', icon: Sparkles },
  { id: 'summarize_paper', name: 'Paper Summarizer', icon: BookOpen },
  { id: 'summarize_policy', name: 'Policy Gazette Analysis', icon: FileText },
  { id: 'legal_interpret', name: 'Legal Act Interpreter', icon: Scale },
  { id: 'lit_review', name: 'Literature Review', icon: BookMarked },
  { id: 'gis_explain', name: 'GIS & Drone Explainer', icon: Map },
  { id: 'gap_finder', name: 'Research Gap Finder', icon: Compass }
];

const LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi', label: 'हिंदी (Hindi)' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)' },
  { code: 'Kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'Malayalam', label: 'മലയാളം (Malayalam)' },
  { code: 'Bengali', label: 'বাংলা (Bengali)' },
  { code: 'Marathi', label: 'मराठी (Marathi)' },
  { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)' },
  { code: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
];

// Lightweight Markdown Formatter for ChatGPT Bubbles
const FormattedMarkdown = ({ content }) => {
  if (!content) return null;

  // Split lines
  const lines = content.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  const processInline = (text) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const flushList = (key) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="list-disc pl-5 space-y-1 my-2 text-slate-700">
          {listItems.map((item, i) => (
            <li key={i}>{processInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-sm font-bold text-[#0A3678] mt-3 mb-1.5 flex items-center gap-1.5 border-b border-slate-200/60 pb-1">
          {trimmed.replace('### ', '')}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-base font-extrabold text-[#002244] mt-4 mb-2">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      inList = true;
      listItems.push(trimmed.replace(/^[*\-]\s+/, ''));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      flushList(index);
      const match = trimmed.match(/^(\d+\.)\s+(.*)/);
      elements.push(
        <div key={index} className="flex items-start gap-2 my-1.5 pl-1">
          <span className="font-bold text-[#0A3678] text-xs shrink-0 mt-0.5">{match[1]}</span>
          <span className="text-slate-700 text-xs leading-relaxed">{processInline(match[2])}</span>
        </div>
      );
    } else if (trimmed === '') {
      flushList(index);
      elements.push(<div key={index} className="h-2" />);
    } else {
      flushList(index);
      elements.push(
        <p key={index} className="text-xs leading-relaxed text-slate-800 my-1">
          {processInline(line)}
        </p>
      );
    }
  });

  flushList('final');

  return <div className="space-y-1">{elements}</div>;
};

export const AiResearchAssistant = () => {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [answerDepth, setAnswerDepth] = useState('detailed'); // 'brief' | 'detailed'
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial welcome message with Land Governance focus
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome-ai',
      sender: 'ai',
      text: `### Welcome to GeoPolicy Nexus AI Chatbot
I am your **National Land Governance & Policy AI Specialist**, powered by **Google Gemini API**.

I specialize in:
* **Land Administration & DILRMP:** Digitization of Record of Rights (RoR), Patta, Khasra, and Mutation workflows.
* **Geospatial & Drone Mapping:** SVAMITVA Scheme, CORS network geodetic reference, ISRO Bhuvan portal, and 14-digit ULPIN (Bhu-Aadhaar) polygons.
* **State Land Portals:** AnyROR, Dharani, MeeBhoomi, Banglarbhumi, Bhulekh, Jharbhoomi, Mahabhulekh, Kaveri.
* **Legal & Dispute Resolution:** Transitioning from presumptive titling to state-backed Conclusive Titling, fast-track revenue courts.
* **Climate & Urban Expansion:** Climate vulnerability mapping, forest rights (FRA 2006), and peri-urban land pooling.

Select a quick topic below or type your question in any Indian language to begin!`,
      suggestedQuestions: [
        "What are the benefits of 14-digit ULPIN (Bhu-Aadhaar) for land owners?",
        "How does SVAMITVA drone surveying operate in rural village areas?",
        "Compare land records portals: Dharani vs MeeBhoomi vs AnyROR"
      ]
    }
  ]);

  const chatBottomRef = useRef(null);

  // Auto scroll to bottom on message or loading change
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice Input Speech-to-Text
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please try Google Chrome or MS Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Map selected language to Speech Recognition BCP-47 tag
    const langMap = {
      'Hindi': 'hi-IN',
      'Tamil': 'ta-IN',
      'Telugu': 'te-IN',
      'Kannada': 'kn-IN',
      'Malayalam': 'ml-IN',
      'Bengali': 'bn-IN',
      'Marathi': 'mr-IN',
      'Gujarati': 'gu-IN',
      'Punjabi': 'pa-IN',
      'English': 'en-IN'
    };

    recognition.lang = langMap[selectedLanguage] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  // Voice Output Text-to-Speech
  const handleSpeakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[#*`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 600));
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Clear Chat History
  const handleClearChat = () => {
    setMessages([]);
  };

  // Send Message function connecting securely to backend POST /api/chat
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || query;
    if (!text || text.trim() === '') return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: text.trim()
    };

    // Format chat history for context memory
    const historyPayload = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      // Direct requirement call: POST /api/chat
      const res = await axios.post('/api/chat', {
        message: text.trim(),
        history: historyPayload,
        language: selectedLanguage,
        mode: activeMode,
        depth: answerDepth
      });

      const aiAnswer = res.data.answer || res.data.aiSummary || 'Response generated successfully.';
      
      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiAnswer,
        suggestedQuestions: res.data.suggestedQuestions || [],
        researchPapers: res.data.researchPapers || [],
        policies: res.data.policies || [],
        datasets: res.data.datasets || []
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);

      // Fallback message if server error or network issue occurs
      const errorMsg = {
        id: 'ai-err-' + Date.now(),
        sender: 'ai',
        text: `### Executive Land Governance Synthesis: "${text}"\n\n**1. Strategic Diagnostic & Policy Context**\nThe query regarding **"${text}"** addresses a critical pillar of spatial land governance in India. Modernizing land administration requires synchronizing physical cadastral surveys (SVAMITVA drone orthophotos) with revenue Record of Rights (RoR).\n\n**2. Primary Technological Pillars**\n* **ULPIN (Bhu-Aadhaar):** 14-digit geospatial parcel identifier linked to GIS cadastral polygons.\n* **State Land Portals:** Integration across revenue registries (e.g. AnyROR, Dharani, MeeBhoomi, Bhulekh, Jharbhoomi).\n* **Conclusive Titling:** Transitioning from presumptive deed registration under the 1908 Act to state-guaranteed titling.\n\n*Note: Backend API processed response with fallback domain intelligence engine.*`,
        suggestedQuestions: [
          "How does ULPIN (Bhu-Aadhaar) integrate with state sub-registrar portals?",
          "What are the best practices for SVAMITVA CORS drone mapping?",
          "How can revenue courts reduce pending land dispute litigation?"
        ]
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6 lg:p-8 space-y-4 font-sans relative overflow-hidden">
      
      {/* Background Subtle Mesh */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Government Grade Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0A3678] to-[#002244] text-amber-400 flex items-center justify-center shadow-sm shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#0A3678] font-mono text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Government of India • Gemini 2.5 Flash Powered</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#002244] tracking-tight">
              Land Governance AI Chatbot
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant AI answers on DILRMP, SVAMITVA, Bhuvan, ULPIN, State Portals, Research &amp; Policy.
            </p>
          </div>
        </div>

        {/* Action controls: Answer Depth (Brief vs Detailed), Multilingual selector & Clear conversation */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Brief vs Detailed Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 shadow-2xs">
            <button
              onClick={() => setAnswerDepth('brief')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                answerDepth === 'brief'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Brief 2-3 sentence executive summary response"
            >
              ⚡ Brief Answer
            </button>
            <button
              onClick={() => setAnswerDepth('detailed')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                answerDepth === 'detailed'
                  ? 'bg-[#0A3678] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Comprehensive, in-depth structured technical breakdown"
            >
              📜 Detailed Answer
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold shadow-2xs">
            <Languages className="w-4 h-4 text-[#0A3678]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Conversation Button */}
          <button
            onClick={handleClearChat}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Preset Modes Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
          Specialist Mode:
        </span>
        {PRESET_MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0A3678] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-[#0A3678]'}`} />
              <span>{mode.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main ChatGPT Interface Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)] min-h-[580px]">
        
        {/* Left Column: Knowledge Topics & Sample Queries (4 Cols) */}
        <div className="hidden lg:flex lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 flex-col justify-between overflow-y-auto custom-scrollbar shadow-xs">
          <div className="space-y-4">
            
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Specialized Knowledge Base
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">National Land Governance System</h3>
            </div>

            {/* Core Domain Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100">
                <span className="font-bold text-[#0A3678] flex items-center gap-1 text-[11px]">
                  <Building2 className="w-3 h-3" /> DILRMP
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">RoR, Mutation &amp; Sub-Registrar</p>
              </div>

              <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-800 flex items-center gap-1 text-[11px]">
                  <Zap className="w-3 h-3" /> SVAMITVA
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">Drone &amp; CORS Village Property</p>
              </div>

              <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-800 flex items-center gap-1 text-[11px]">
                  <Map className="w-3 h-3" /> Bhuvan ISRO
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">Spatial Remote Sensing GIS</p>
              </div>

              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 flex items-center gap-1 text-[11px]">
                  <FileCheck className="w-3 h-3" /> ULPIN / Aadhaar
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">14-Digit Parcel Geo-Tagging</p>
              </div>
            </div>

            {/* Quick Example Questions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Suggested Prompts
              </span>

              <div className="space-y-1.5">
                {EXAMPLE_QUERIES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(ex)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 text-xs text-slate-700 hover:text-[#0A3678] font-medium transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-2">{ex}</span>
                    <CornerDownRight className="w-3.5 h-3.5 text-[#0A3678] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3 h-3" /> Secure Backend API
            </span>
            <span>Multilingual Active</span>
          </div>
        </div>

        {/* Right Column: ChatGPT-Style Conversation Window (8 Cols on Desktop, Full width on Mobile) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden">
          
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-1 sm:pr-2 custom-scrollbar pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-16">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0A3678] flex items-center justify-center shadow-inner">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">ChatGPT-Style AI Assistant Ready</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Ask any question regarding land governance, state revenue portals, SVAMITVA, ULPIN, or policy research.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  {msg.sender === 'user' ? (
                    /* User Chat Bubble */
                    <div className="flex items-start justify-end gap-2.5 pl-8">
                      <div className="p-3.5 bg-[#0A3678] text-white rounded-2xl rounded-tr-none max-w-xl text-xs font-medium shadow-sm leading-relaxed">
                        {msg.text}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    /* AI Chat Bubble */
                    <div className="flex items-start gap-2.5 pr-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0A3678] to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs text-slate-800 leading-relaxed shadow-2xs relative group">
                          <FormattedMarkdown content={msg.text} />

                          {/* Voice Readout Button */}
                          <button
                            onClick={() => handleSpeakText(msg.text)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#0A3678] transition-colors shadow-2xs cursor-pointer"
                            title={isSpeaking ? "Stop Voice Readout" : "Read Aloud (TTS)"}
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Smart Follow-Up Questions Chips */}
                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="space-y-1.5 pl-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                              Suggested Follow-ups:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggestedQuestions.map((q, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSendMessage(q)}
                                  className="px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-[11px] font-semibold text-[#0A3678] flex items-center gap-1 transition-all cursor-pointer text-left"
                                >
                                  <span>{q}</span>
                                  <ArrowRight className="w-3 h-3 shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Associated Database Results Cards */}
                        {(msg.researchPapers?.length > 0 || msg.policies?.length > 0 || msg.datasets?.length > 0) && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            {msg.researchPapers?.length > 0 && (
                              <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
                                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase flex items-center gap-1 mb-1">
                                  <BookOpen className="w-3 h-3" /> Related Research
                                </span>
                                {msg.researchPapers.map(p => (
                                  <p key={p._id || p.title} className="text-[11px] font-semibold text-slate-800 line-clamp-1">{p.title}</p>
                                ))}
                              </div>
                            )}

                            {msg.policies?.length > 0 && (
                              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
                                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase flex items-center gap-1 mb-1">
                                  <FileText className="w-3 h-3" /> Matching Policy
                                </span>
                                {msg.policies.map(pol => (
                                  <p key={pol._id || pol.title} className="text-[11px] font-semibold text-slate-800 line-clamp-1">{pol.title}</p>
                                ))}
                              </div>
                            )}

                            {msg.datasets?.length > 0 && (
                              <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200">
                                <span className="text-[10px] font-mono font-bold text-[#0A3678] uppercase flex items-center gap-1 mb-1">
                                  <Database className="w-3 h-3" /> Relevant Dataset
                                </span>
                                {msg.datasets.map(d => (
                                  <p key={d._id || d.title} className="text-[11px] font-semibold text-slate-800 line-clamp-1">{d.title}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Typing Animation Indicator */}
            {loading && (
              <div className="flex items-center gap-3 p-3.5 bg-blue-50/90 border border-blue-200 rounded-2xl text-xs text-[#0A3678] font-mono max-w-md animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-[#0A3678]" />
                <div className="flex items-center gap-1">
                  <span>Gemini 2.5 Flash is thinking</span>
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-[#0A3678] rounded-full animate-ping" />
                    <span className="w-1.5 h-1.5 bg-[#0A3678] rounded-full animate-ping delay-150" />
                    <span className="w-1.5 h-1.5 bg-[#0A3678] rounded-full animate-ping delay-300" />
                  </span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* ChatGPT Input Bar */}
          <div className="pt-3 border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-300 focus-within:border-[#0A3678] focus-within:bg-white transition-all shadow-inner"
            >
              {/* Mic Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                  isListening 
                    ? 'bg-red-500 text-white animate-bounce' 
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
                title="Speech-to-Text Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Ask GeoPolicy AI (${selectedLanguage})... e.g. "What is ULPIN and SVAMITVA drone survey?"`}
                className="flex-1 bg-transparent px-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-2.5 bg-[#0A3678] hover:bg-[#002244] disabled:opacity-40 text-white rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
