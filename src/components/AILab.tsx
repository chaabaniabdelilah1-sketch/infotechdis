import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Video, Upload, Key, Loader2, Download, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Declare global aistudio object
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export function AILab() {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Image Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Video Generation State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    try {
      if (window.aistudio?.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasKey(has);
      } else {
        // Fallback if not in AI Studio environment
        setHasKey(!!process.env.GEMINI_API_KEY);
      }
    } catch (err) {
      console.error("Error checking API key:", err);
      setHasKey(false);
    }
  };

  const handleSelectKey = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        // Assume success to mitigate race condition
        setHasKey(true);
      } else {
        setError("L'environnement AI Studio n'est pas détecté.");
      }
    } catch (err) {
      console.error("Error opening key selector:", err);
      setError("Erreur lors de la sélection de la clé API.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateImage = async () => {
    if (!imagePrompt) {
      setError("Veuillez entrer un prompt.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Create a fresh instance right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: imagePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: imageSize
          }
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        setError("Aucune image n'a été générée.");
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      if (err.message?.includes("Requested entity was not found")) {
         setHasKey(false);
         setError("Clé API invalide ou non trouvée. Veuillez la sélectionner à nouveau.");
      } else {
         setError(err.message || "Erreur lors de la génération de l'image.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const generateVideo = async () => {
    if (!selectedImage) {
      setError("Veuillez uploader une image initiale.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Extract base64 data without the prefix
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || undefined,
        image: {
          imageBytes: base64Data,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p', // Veo fast generate supports 720p or 1080p, let's use 720p to be safe
          aspectRatio: videoAspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        // Fetch the video with the API key header
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY || '',
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setGeneratedVideoUrl(url);
        } else {
          setError("Erreur lors du téléchargement de la vidéo générée.");
        }
      } else {
        setError("Aucune vidéo n'a été générée.");
      }
    } catch (err: any) {
      console.error("Video generation error:", err);
      if (err.message?.includes("Requested entity was not found")) {
         setHasKey(false);
         setError("Clé API invalide ou non trouvée. Veuillez la sélectionner à nouveau.");
      } else {
         setError(err.message || "Erreur lors de la génération de la vidéo. Cela peut prendre plusieurs minutes.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="ailab" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-secondary-600 mr-2 animate-pulse"></span>
            Nouveau : Laboratoire IA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Testez mes Outils IA
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez la puissance des modèles génératifs de Google (Gemini Pro Image & Veo) intégrés directement dans vos projets.
          </p>
          <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full mt-6"></div>
        </div>

        {!hasKey ? (
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key size={32} />
            </div>
            <h3 className="text-2xl font-bold heading-font text-gray-900 mb-4">
              Clé API Requise
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Pour utiliser le Laboratoire IA (génération d'images haute qualité et vidéos), vous devez configurer votre propre clé API Google Cloud avec facturation activée.
              <br/><br/>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-secondary-600 hover:underline">
                En savoir plus sur la facturation Gemini API
              </a>
            </p>
            <button
              onClick={handleSelectKey}
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-secondary-600 hover:bg-secondary-700 text-white font-medium text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Key className="mr-2 h-5 w-5" />
              Sélectionner ma Clé API
            </button>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'image' 
                    ? 'bg-secondary-50 text-secondary-700 border-b-2 border-secondary-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <ImageIcon size={20} />
                Génération d'Images (Gemini Pro)
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'video' 
                    ? 'bg-secondary-50 text-secondary-700 border-b-2 border-secondary-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <Video size={20} />
                Image vers Vidéo (Veo)
              </button>
            </div>

            <div className="p-6 md:p-8 bg-gray-50">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start text-red-700">
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {activeTab === 'image' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prompt (Description de l'image)</label>
                      <textarea
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        rows={4}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all resize-none"
                        placeholder="Un robot futuriste travaillant sur un ordinateur portable dans un café cyberpunk..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Taille de l'image</label>
                      <div className="flex gap-3">
                        {['1K', '2K', '4K'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setImageSize(size as any)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              imageSize === size 
                                ? 'bg-secondary-600 text-white border-secondary-600' 
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={generateImage}
                      disabled={isProcessing || !imagePrompt}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="-ml-1 mr-2 h-5 w-5" />
                          Générer l'Image
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 flex items-center justify-center min-h-[300px] lg:min-h-full overflow-hidden relative">
                    {generatedImage ? (
                      <div className="relative w-full h-full group">
                        <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                        <a 
                          href={generatedImage} 
                          download="generated-image.png"
                          className="absolute bottom-4 right-4 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download size={20} />
                        </a>
                      </div>
                    ) : (
                      <div className="text-center p-6 text-gray-400">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>L'image générée apparaîtra ici</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'video' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Initiale (Requise)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 hover:border-secondary-400 transition-colors cursor-pointer relative overflow-hidden"
                      >
                        {selectedImage ? (
                          <div className="relative h-32 w-full">
                            <img src={selectedImage} alt="Selected" className="h-full w-full object-contain" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-white text-sm font-medium">Changer l'image</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-4">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Cliquez pour uploader une image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5MB</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prompt (Optionnel)</label>
                      <textarea
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        rows={2}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all resize-none"
                        placeholder="Décrivez le mouvement ou l'action souhaitée..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format (Aspect Ratio)</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setVideoAspectRatio('16:9')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            videoAspectRatio === '16:9' 
                              ? 'bg-secondary-600 text-white border-secondary-600' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          Paysage (16:9)
                        </button>
                        <button
                          onClick={() => setVideoAspectRatio('9:16')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            videoAspectRatio === '9:16' 
                              ? 'bg-secondary-600 text-white border-secondary-600' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          Portrait (9:16)
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={generateVideo}
                      disabled={isProcessing || !selectedImage}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                          Génération en cours (peut prendre qq minutes)...
                        </>
                      ) : (
                        <>
                          <Video className="-ml-1 mr-2 h-5 w-5" />
                          Animer l'Image
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 flex items-center justify-center min-h-[300px] lg:min-h-full overflow-hidden relative">
                    {generatedVideoUrl ? (
                      <video 
                        src={generatedVideoUrl} 
                        controls 
                        autoPlay 
                        loop 
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <div className="text-center p-6 text-gray-400">
                        <Video size={48} className="mx-auto mb-4 opacity-20" />
                        <p>La vidéo générée apparaîtra ici</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
