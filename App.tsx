import React, { useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Loader2, AlertCircle, BarChart2 } from 'lucide-react';
import { generateMemeConcepts } from './services/geminiService';
import { MemeResponse, MemeConcept } from './types';
import { MemeDisplay } from './components/MemeDisplay';
import { TokenStats } from './components/TokenStats';

type View = 'meme' | 'stats';

const App: React.FC = () => {
  const [view, setView] = useState<View>('meme');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [memeData, setMemeData] = useState<MemeResponse | null>(null);
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setError("File is too large (max 5MB)");
        return;
      }

      setImageFile(file);
      setError(null);
      
      // Create preview and base64 for API
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setMemeData(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!imagePreview) return;
    
    setLoading(true);
    setError(null);
    try {
      // Extract base64 data (remove "data:image/jpeg;base64," prefix)
      const base64Data = imagePreview.split(',')[1];
      const data = await generateMemeConcepts(base64Data);
      setMemeData(data);
      setSelectedConceptIndex(0);
    } catch (err: any) {
      setError(err.message || "Failed to generate memes. Try a different image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-white p-4 md:p-8 font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl mb-4 border border-zinc-800 shadow-xl">
           <span className="text-3xl mr-2">🤖</span>
           <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
             MEME MACHINE
           </h1>
        </div>
        <p className="text-zinc-400 text-lg max-w-lg mx-auto">
          Upload any chaotic photo. Our AI roasts you, relates to you, or just gets weird.
        </p>

        {/* Nav tabs */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setView('meme')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all
              ${view === 'meme'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <span>🎭</span> Meme Generator
          </button>
          <button
            onClick={() => setView('stats')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all
              ${view === 'stats'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <BarChart2 size={14} /> Token Usage Stats
          </button>
        </div>
      </header>

      {view === 'stats' && (
        <main className="max-w-4xl mx-auto">
          <TokenStats />
        </main>
      )}

      {view === 'meme' && <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        
        {/* Left Column: Upload & Controls */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="text-pink-500" />
              Source Material
            </h2>
            
            <label className="block w-full cursor-pointer group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
              />
              <div className={`
                relative h-64 w-full rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                ${imagePreview ? 'border-zinc-700 bg-black' : 'border-zinc-700 hover:border-pink-500 hover:bg-zinc-800/50'}
              `}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-10 h-10 text-zinc-500 mx-auto mb-2 group-hover:text-pink-500 transition-colors" />
                    <p className="text-zinc-400 text-sm">Drop image or click to upload</p>
                  </div>
                )}
              </div>
            </label>

            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!imagePreview || loading}
              className={`
                w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                ${!imagePreview || loading 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:-translate-y-1'
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Analyzing Vibes...
                </>
              ) : (
                <>
                  <Sparkles className="fill-current" /> GENERATE MEMES
                </>
              )}
            </button>
          </div>

          {/* Tips */}
          {!memeData && (
             <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 text-sm text-zinc-500">
               <strong className="text-zinc-400 block mb-2">How it works:</strong>
               <ul className="list-disc pl-4 space-y-1">
                 <li>AI detects emotions and context.</li>
                 <li>Generates 3 personalities (Relatable, Mean, Weird).</li>
                 <li>Applies visual filters like "Deep Fry" or "Laser Eyes".</li>
               </ul>
             </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="lg:min-h-[600px]">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 min-h-[400px]">
               <div className="relative w-20 h-20">
                 <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-t-pink-500 rounded-full animate-spin"></div>
               </div>
               <p className="animate-pulse">Consulting the council of memes...</p>
            </div>
          ) : memeData && imagePreview ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Tabs */}
              <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto">
                {memeData.concepts.map((concept, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedConceptIndex(idx)}
                    className={`
                      flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                      ${selectedConceptIndex === idx 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                      }
                    `}
                  >
                    {concept.style === 'RELATABLE' && '🥺 Relatable'}
                    {concept.style === 'ROAST' && '🔥 Roast'}
                    {concept.style === 'ABSURDIST' && '👽 Absurdist'}
                  </button>
                ))}
              </div>

              {/* Main Display */}
              <MemeDisplay 
                imageSrc={imagePreview}
                concept={memeData.concepts[selectedConceptIndex]}
              />

              {/* Edit Note */}
              {memeData.concepts[selectedConceptIndex].visualEffect === 'LASER_EYES' && (
                <div className="text-center text-xs text-pink-500 animate-pulse">
                  ✨ Tip: You can drag the laser eyes to fit the face!
                </div>
              )}

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-700 border-2 border-dashed border-zinc-800 rounded-2xl min-h-[400px] bg-zinc-900/20">
              <span className="text-4xl mb-4 opacity-20">🖼️</span>
              <p>Upload an image to start generating</p>
            </div>
          )}
        </div>

      </main>}

    </div>
  );
};

export default App;
