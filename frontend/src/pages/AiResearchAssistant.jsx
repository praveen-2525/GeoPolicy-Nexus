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
  FileCheck
} from 'lucide-react';
import axios from 'axios';

const SAMPLE_HISTORIES = [
  { id: 'hist-01', title: 'Land disputes in Tamil Nadu', timestamp: 'Today, 2:15 PM' },
  { id: 'hist-02', title: 'ULPIN Cadastral Survey & GIS', timestamp: 'Yesterday' },
  { id: 'hist-03', title: 'Conclusive Titling Act 2024', timestamp: '3 days ago' }
];

export const AiResearchAssistant = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState(SAMPLE_HISTORIES);
  const [activeSessionId, setActiveSessionId] = useState('hist-01');
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'user',
      text: 'Land disputes in Tamil Nadu'
    },
    {
      id: 'msg-ai-init',
      sender: 'ai',
      text: `### Executive Land Governance Synthesis: "Land disputes in Tamil Nadu"

**1. Strategic Overview & Diagnosis**
Land disputes in Tamil Nadu predominantly originate from boundary ambiguities between Natham rural housing plots, agricultural Patta records, and state forest reservations. Presumptive titling under the Tamil Nadu Patta Pass Book Act (1983) creates evidentiary delays in civil litigation.

**2. Legal & Spatial Boundary Challenges**
* **Patta vs. Chitta Discrepancies:** Mismatches between Field Measurement Sketches (FMS) and Computerized Patta databases.
* **Urban Expansion Frictions:** Encroachment along coastal Chennai & Kanchipuram peri-urban belts without updated spatial layers.
* **Informal Partitioning:** Subdivisions performed without registered revenue surveyor verification.

**3. Actionable Policy & Technical Roadmap**
* **DILRMP Modernization:** Accelerate DILRMP (Digital India Land Records Modernization Programme) auto-mutation systems.
* **High-Precision CORS Surveying:** Continuous Operating Reference Stations (CORS) setup across all 38 districts to digitize FMS vectors.
* **Specialized Land Tribunals:** Establish digital land dispute tribunals linked with real-time GIS evidence layers.`,
      researchPapers: [
        {
          _id: 'p1',
          title: 'Conclusive Land Titling in India: Legal & Economic Analysis',
          author: 'Dr. Ramesh Sundaram',
          category: 'Land Rights',
          doi: '10.1016/j.landuse.2024.01'
        }
      ],
      policies: [
        {
          _id: 'pol1',
          title: 'Tamil Nadu Land Revenue Reform & Digital Patta Act 2023',
          state: 'Tamil Nadu',
          status: 'Enforced',
          category: 'Land Titling'
        }
      ],
      datasets: [
        {
          _id: 'd1',
          title: 'Tamil Nadu Cadastral Boundaries Vector Layer',
          provider: 'Tamil Nadu Survey & Land Records Dept',
          format: 'GeoJSON / Shapefile'
        }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || query;
    if (!messageText || messageText.trim() === '') return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: messageText
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await axios.post('/api/ai/consult', {
        message: messageText
      });

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: res.data.aiSummary,
        researchPapers: res.data.researchPapers || [],
        policies: res.data.policies || [],
        datasets: res.data.datasets || []
      };

      setMessages(prev => [...prev, aiMsg]);

      // Update sidebar history
      if (!chatHistory.some(h => h.title.toLowerCase() === messageText.toLowerCase())) {
        const newHist = {
          id: 'hist-' + Date.now(),
          title: messageText.length > 30 ? messageText.substring(0, 30) + '...' : messageText,
          timestamp: 'Just now'
        };
        setChatHistory([newHist, ...chatHistory]);
        setActiveSessionId(newHist.id);
      }
    } catch (err) {
      console.error('Error fetching AI consultation:', err);
      const errorMsg = {
        id: 'ai-err-' + Date.now(),
        sender: 'ai',
        text: '⚠️ Unable to connect to Gemini AI network. Please verify backend service on port 5000.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewChat = () => {
    setMessages([]);
    setActiveSessionId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>National Spatial AI Copilot Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">AI Research Assistant</h1>
          <p className="text-xs text-slate-400 mt-1">
            Gemini-powered consultation for evidence-based land policy synthesis, research retrieval, and cadastral dataset recommendations.
          </p>
        </div>

        <button
          onClick={handleStartNewChat}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Research Thread</span>
        </button>
      </div>

      {/* Main Grid: Sidebar History + Chat Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[720px]">
        
        {/* Sidebar Chat History (1 Col) */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Research Threads History
              </span>
            </div>

            <div className="space-y-2">
              {chatHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveSessionId(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    activeSessionId === item.id 
                      ? 'bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-md' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <p className="text-xs font-semibold truncate leading-snug">{item.title}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gemini 1.5 Flash Model Connected</span>
            </div>
            <p>Indexed across 10,000+ Land Policy Archives</p>
          </div>
        </div>

        {/* Chat Feed & Output View (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between overflow-hidden relative shadow-2xl">
          
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar pb-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-xl">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Ask GeoPolicy Nexus AI Copilot</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Inquire about land dispute resolution, legislative policy drafts, cadastral GIS layers, or request research paper summaries.
                  </p>
                </div>

                {/* Example Quick Prompt Chips */}
                <div className="pt-4 space-y-2 w-full max-w-lg">
                  <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Try Example Prompt Queries:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSendMessage("Land disputes in Tamil Nadu")}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs text-slate-300 hover:text-white text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>"Land disputes in Tamil Nadu"</span>
                      <CornerDownRight className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleSendMessage("Digital titling framework in Maharashtra")}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs text-slate-300 hover:text-white text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>"Digital titling in Maharashtra"</span>
                      <CornerDownRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleSendMessage("ULPIN implementation and spatial GIS benefits")}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs text-slate-300 hover:text-white text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>"ULPIN GIS implementation"</span>
                      <CornerDownRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleSendMessage("Forest rights act & tribal land tenure policy")}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs text-slate-300 hover:text-white text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>"Forest rights & tribal land policy"</span>
                      <CornerDownRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="space-y-4">
                  {msg.sender === 'user' ? (
                    <div className="flex items-start justify-end gap-3">
                      <div className="p-4 bg-purple-600 text-white rounded-3xl rounded-tr-none max-w-xl text-xs shadow-lg font-medium leading-relaxed">
                        {msg.text}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-purple-400 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>

                      <div className="flex-1 space-y-4">
                        
                        {/* Executive AI Synthesis Text */}
                        <div className="p-6 bg-slate-950 rounded-3xl border border-purple-500/30 text-xs text-slate-200 leading-relaxed whitespace-pre-line shadow-xl">
                          {msg.text}
                        </div>

                        {/* Multi-Domain Relevant Results Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Relevant Research Papers */}
                          {msg.researchPapers && msg.researchPapers.length > 0 && (
                            <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-2">
                              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold uppercase border-b border-slate-800 pb-2">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Relevant Research</span>
                              </div>
                              {msg.researchPapers.map(p => (
                                <div key={p._id} className="space-y-1">
                                  <p className="text-xs font-bold text-white line-clamp-2">{p.title}</p>
                                  <p className="text-[10px] text-slate-400">By: {p.author || 'Research Team'}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Relevant Policies */}
                          {msg.policies && msg.policies.length > 0 && (
                            <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-2">
                              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase border-b border-slate-800 pb-2">
                                <FileText className="w-3.5 h-3.5" />
                                <span>Relevant Policies</span>
                              </div>
                              {msg.policies.map(pol => (
                                <div key={pol._id} className="space-y-1">
                                  <p className="text-xs font-bold text-white line-clamp-2">{pol.title}</p>
                                  <p className="text-[10px] text-amber-400">Jurisdiction: {pol.state}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Relevant Datasets */}
                          {msg.datasets && msg.datasets.length > 0 && (
                            <div className="p-4 bg-slate-950 rounded-2xl border border-blue-500/30 space-y-2">
                              <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[11px] font-bold uppercase border-b border-slate-800 pb-2">
                                <Database className="w-3.5 h-3.5" />
                                <span>Relevant Datasets</span>
                              </div>
                              {msg.datasets.map(d => (
                                <div key={d._id} className="space-y-1">
                                  <p className="text-xs font-bold text-white line-clamp-2">{d.title}</p>
                                  <p className="text-[10px] text-blue-400">Format: {d.format || 'Vector Layer'}</p>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {loading && (
              <div className="flex items-center gap-3 p-4 bg-slate-950/80 rounded-2xl border border-purple-500/40 text-xs text-purple-300 font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span>Gemini AI is querying national spatial indices &amp; synthesizing policy recommendation...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input Box Bar */}
          <div className="pt-4 border-t border-slate-800">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-700 focus-within:border-purple-500 shadow-inner"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI Research Assistant (e.g. 'Land disputes in Tamil Nadu')..."
                className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl shadow-md transition-all cursor-pointer"
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
