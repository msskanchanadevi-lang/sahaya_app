import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Send, 
  Globe, 
  Heart,
  Sliders,
  Type,
  Sun,
  Loader2,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ChatMessage, AppLanguage, VoiceSpeed } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

export const VoiceCompanion: React.FC = () => {
  const { 
    speak, 
    stopSpeaking, 
    isSpeaking, 
    voiceSpeed, 
    setVoiceSpeed, 
    setTextSize, 
    textSize,
    setHighContrast,
    highContrast,
    language,
    setLanguage,
    t,
    currentLanguageMeta,
    supportedLanguages
  } = useAccessibility();

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting in selected language
  const getGreetingMessage = useCallback((lang: AppLanguage): string => {
    switch (lang) {
      case 'ta':
        return 'வணக்கம்! நான் உங்கள் சகாயா டிஜிட்டல் தோழன். ஸ்மார்ட்போன் பயன்பாடுகள், QR குறியீடுகள், வீடியோ அழைப்புகள் குறித்து என்னிடம் இயல்பான தமிழில் கேளுங்கள்.';
      case 'hi':
        return 'नमस्ते! मैं आपका सहाय डिजिटल साथी हूँ। स्मार्टफोन, QR कोड, वीडियो कॉल या किसी भी ऐप के बारे में बेझिझक पूछें। मैं आपकी पूरी मदद करूँगा।';
      case 'te':
        return 'నమస్కారం! నేను మీ సహాయ డిజిటల్ నేస్తాన్ని. స్మార్ట్‌ఫోన్, QR కోడ్, వీడియో కాల్స్ లేదా ఏదైనా సమస్య గురించి తెలుగులో అడగండి.';
      case 'ml':
        return 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ സഹായ ഡിജിറ്റൽ കൂട്ടുകാരനാണ്. സ്മാർട്ട്ഫോൺ, QR കോഡ്, വീഡിയോ കോൾ എന്നിവയെക്കുറിച്ച് മലയാളത്തിൽ ചോദിക്കൂ.';
      case 'mr':
        return 'नमस्कार! मी तुमचा सहाय डिजिटल सोबती आहे. स्मार्टफोन, QR कोड, व्हिडिओ कॉल किंवा ॲप्सबद्दल मराठीत विचारा.';
      case 'en':
      default:
        return 'Hello! I am SAHAYA, your patient digital companion. You can speak to me naturally, or tap any common question below. I can guide you through smartphone tasks, QR codes, or adjust website settings for your comfort.';
    }
  }, []);

  // Set greeting on first load or language change if chat is empty or contains only initial greeting
  useEffect(() => {
    setChatMessages(prev => {
      if (prev.length === 0 || (prev.length === 1 && prev[0].role === 'assistant')) {
        return [{
          id: 'initial-greeting',
          role: 'assistant',
          text: getGreetingMessage(language),
          timestamp: new Date(),
          language,
        }];
      }
      return prev;
    });
  }, [language, getGreetingMessage]);

  // Sync voice state with context isSpeaking
  useEffect(() => {
    if (isSpeaking && voiceState !== 'listening' && voiceState !== 'thinking') {
      setVoiceState('speaking');
    } else if (!isSpeaking && voiceState === 'speaking') {
      setVoiceState('idle');
    }
  }, [isSpeaking, voiceState]);

  // Scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, voiceState]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLanguageMeta.recognitionLang;

      recognition.onstart = () => {
        setVoiceState('listening');
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const speechText = event.results[current][0].transcript;
        setTranscript(speechText);
      };

      recognition.onend = () => {
        // Handled in handler
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage(t('voice.mic_denied', 'Microphone permission was not granted. You can type your question instead.'));
        } else if (event.error !== 'no-speech') {
          setErrorMessage(t('voice.state_error', 'Something went wrong. Try again.'));
        }
        setVoiceState('idle');
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [currentLanguageMeta, t]);

  // Start microphone
  const handleStartListening = () => {
    if (isSpeaking) stopSpeaking();
    setErrorMessage(null);

    if (recognitionRef.current) {
      try {
        setTranscript('');
        recognitionRef.current.lang = currentLanguageMeta.recognitionLang;
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start exception:', err);
        try {
          recognitionRef.current.abort();
          recognitionRef.current.start();
        } catch {
          setVoiceState('idle');
        }
      }
    } else {
      setErrorMessage(t('voice.mic_unsupported', 'Voice input is not supported in this browser. You can type your question!'));
    }
  };

  // Stop microphone and send recognized text
  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    
    if (transcript && transcript.trim()) {
      handleSendMessage(transcript.trim());
    } else {
      setVoiceState('idle');
    }
  };

  // Send message to Gemini chat API
  const handleSendMessage = async (userText: string) => {
    if (!userText || !userText.trim()) return;

    if (isSpeaking) stopSpeaking();

    const cleanText = userText.trim();
    setTextInput('');
    setTranscript('');
    setVoiceState('thinking');
    setErrorMessage(null);

    // Create user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: cleanText,
      timestamp: new Date(),
      language,
    };

    // Check for direct accessibility shortcuts
    let quickActionTriggered: string | undefined = undefined;
    const lower = cleanText.toLowerCase();
    if (lower.includes('bigger') || lower.includes('large text') || lower.includes('பெரிதாக்கு') || lower.includes('अक्षर बड़े') || lower.includes('పెద్దవి')) {
      setTextSize('xl');
      quickActionTriggered = 'Text size enlarged to Extra Large (A++)';
    } else if (lower.includes('high contrast') || lower.includes('கான்ட்ராஸ்ட்') || lower.includes('कंट्रास्ट') || lower.includes('కాంట్రాస్ట్')) {
      setHighContrast(true);
      quickActionTriggered = 'High Contrast Mode Enabled';
    } else if (lower.includes('slow') || lower.includes('மெதுவாக') || lower.includes('धीमी') || lower.includes('నెమ్మదిగా')) {
      setVoiceSpeed(0.8);
      quickActionTriggered = 'Voice speed set to Slow & Calm (0.8x)';
    }

    const updatedHistory = [...chatMessages, userMessage];
    setChatMessages(updatedHistory);

    try {
      // Build messages array for server
      const apiMessages = updatedHistory.map(m => ({
        role: m.role,
        content: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          language: language,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || getGreetingMessage(language);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date(),
        language,
        quickAction: quickActionTriggered,
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      setVoiceState('speaking');

      // Speak response aloud in chosen language and voice speed
      speak(replyText, () => {
        setVoiceState('idle');
      }, language, voiceSpeed);

    } catch (err: any) {
      console.error('Error fetching AI response:', err);
      setErrorMessage(t('voice.state_error', 'Something went wrong. Try again.'));
      setVoiceState('idle');
    }
  };

  // Replay a message
  const handleReplay = (text: string, msgLang?: AppLanguage) => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setVoiceState('speaking');
    speak(text, () => {
      setVoiceState('idle');
    }, msgLang || language, voiceSpeed);
  };

  // Clear chat
  const handleClearChat = () => {
    stopSpeaking();
    setVoiceState('idle');
    setChatMessages([{
      id: `greeting-${Date.now()}`,
      role: 'assistant',
      text: getGreetingMessage(language),
      timestamp: new Date(),
      language,
    }]);
  };

  const presetPrompts = [
    { key: 'voice.preset_1', descKey: 'voice.preset_1_desc', tag: 'QR Code' },
    { key: 'voice.preset_2', descKey: 'voice.preset_2_desc', tag: 'Accessibility' },
    { key: 'voice.preset_3', descKey: 'voice.preset_3_desc', tag: 'Phone Calls' },
    { key: 'voice.preset_4', descKey: 'voice.preset_4_desc', tag: 'Display' },
    { key: 'voice.preset_5', descKey: 'voice.preset_5_desc', tag: 'WhatsApp' },
    { key: 'voice.preset_6', descKey: 'voice.preset_6_desc', tag: 'Health Alarm' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Friendly Microphone Interaction Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E1D8] shadow-lg text-center relative overflow-hidden">
        
        {/* Soft decorative background glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#2D5A5A]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#E89D71]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          
          {/* Badge & Active Language pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D5A5A]/10 text-[#2D5A5A] text-sm font-bold border border-[#2D5A5A]/20">
              <Heart className="w-4 h-4 text-[#2D5A5A] fill-[#2D5A5A]/30" />
              <span>{t('voice.badge', 'AI Voice Support')}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F1EC] text-[#1A1A1A] text-xs font-bold border border-[#E5E1D8]">
              <Globe className="w-3.5 h-3.5 text-[#2D5A5A]" />
              <span>{currentLanguageMeta.nativeName} ({currentLanguageMeta.name})</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
            {t('voice.hero_quote', '"Speak to me naturally — I am here to listen."')}
          </h2>

          <p className="text-lg text-[#5C574F] leading-relaxed font-normal">
            {t('voice.hero_desc', 'Tap the large microphone below and ask any question in plain words. No tech jargon required.')}
          </p>

          {/* Large Friendly Microphone Button & State */}
          <div className="py-2 flex flex-col items-center justify-center">
            <button
              id="voice-mic-main-btn"
              type="button"
              onClick={voiceState === 'listening' ? handleStopListening : handleStartListening}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-xl border-4 ${
                voiceState === 'listening'
                  ? 'bg-[#E89D71] border-[#8B4E2D] text-white scale-110 animate-pulse ring-8 ring-[#E89D71]/40'
                  : voiceState === 'thinking'
                  ? 'bg-[#2D5A5A]/80 border-[#2D5A5A] text-white'
                  : voiceState === 'speaking'
                  ? 'bg-[#2D5A5A] border-[#234848] text-white ring-8 ring-[#2D5A5A]/25'
                  : 'bg-[#2D5A5A] hover:bg-[#234848] text-white border-[#234848] hover:scale-105'
              }`}
              aria-label={
                voiceState === 'listening'
                  ? t('voice.state_listening', 'Listening...')
                  : t('voice.state_idle', 'Tap to Speak')
              }
            >
              {voiceState === 'listening' ? (
                <>
                  <Mic className="w-12 h-12 text-white animate-bounce" />
                  <span className="text-xs font-black uppercase mt-1">
                    {t('voice.state_listening', 'Listening...')}
                  </span>
                </>
              ) : voiceState === 'thinking' ? (
                <>
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                  <span className="text-xs font-black uppercase mt-1">
                    {t('voice.state_thinking', 'Thinking...')}
                  </span>
                </>
              ) : voiceState === 'speaking' ? (
                <>
                  <Volume2 className="w-12 h-12 text-white animate-pulse" />
                  <span className="text-xs font-black uppercase mt-1">
                    {t('voice.state_speaking', 'Speaking...')}
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-12 h-12 text-white" />
                  <span className="text-xs font-black uppercase mt-1">
                    {t('voice.state_idle', 'Tap to Speak')}
                  </span>
                </>
              )}
            </button>

            {/* Listening Status & Live Transcript */}
            <div className="mt-4 min-h-[36px] flex flex-col items-center">
              {voiceState === 'listening' && (
                <div className="flex items-center gap-2 text-[#8B4E2D] font-bold text-base bg-[#E89D71]/15 px-4 py-1.5 rounded-full border border-[#E89D71]/30 animate-pulse">
                  <span>{t('voice.state_listening', 'Listening...')}</span>
                  {transcript && <span className="text-[#1A1A1A] font-medium">"{transcript}"</span>}
                </div>
              )}

              {voiceState === 'speaking' && (
                <button
                  onClick={stopSpeaking}
                  id="voice-stop-speaking-btn"
                  className="px-4 py-1.5 rounded-full bg-[#E89D71] text-[#2C1810] font-bold text-sm flex items-center gap-2 shadow-xs hover:bg-[#d98c60] cursor-pointer transition-colors"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>{t('voice.stop_speaking', 'Stop Speaking')}</span>
                </button>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 text-amber-900 bg-amber-50 px-4 py-2 rounded-xl text-sm border border-amber-200 mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {!speechRecognitionSupported && (
                <div className="text-xs text-[#5C574F] bg-[#F2F1EC] px-3 py-1 rounded-md mt-1">
                  💡 {t('voice.mic_unsupported', 'Voice input is not supported in this browser. You can type your question above!')}
                </div>
              )}
            </div>
          </div>

          {/* Voice Speed Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-bold text-[#5C574F]">{t('voice.speed_label', 'Voice Speed:')}</span>
            <div className="inline-flex rounded-xl bg-[#F2F1EC] p-1 border border-[#E5E1D8]">
              {([0.8, 1.0, 1.2] as VoiceSpeed[]).map((rate) => {
                const isSelected = voiceSpeed === rate;
                const label = rate === 0.8 
                  ? t('voice.speed_slow', 'Slow (0.8x)') 
                  : rate === 1.0 
                  ? t('voice.speed_normal', 'Normal (1.0x)') 
                  : t('voice.speed_fast', 'Faster (1.2x)');
                return (
                  <button
                    key={rate}
                    id={`voice-speed-${rate}`}
                    type="button"
                    onClick={() => setVoiceSpeed(rate)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2D5A5A] text-white shadow-xs'
                        : 'text-[#5C574F] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selector Bar */}
          <div className="pt-3 border-t border-[#E5E1D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2D5A5A]" />
              <span className="text-sm font-bold text-[#1A1A1A]">{t('a11y.lang_title', 'Language:')}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {supportedLanguages.map((lang) => {
                const isCurrent = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`voice-lang-btn-${lang.code}`}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                        : 'bg-white text-[#5C574F] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Accessible Text Input Fallback */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E5E1D8] shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(textInput);
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="text"
            id="voice-text-fallback-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={t('voice.type_placeholder', 'Type your question here in plain words...')}
            className="w-full px-5 py-4 rounded-2xl bg-[#F2F1EC] border-2 border-[#E5E1D8] focus:border-[#2D5A5A] text-base sm:text-lg font-medium text-[#1A1A1A] placeholder-[#8C867A] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            id="voice-text-send-btn"
            disabled={!textInput.trim() || voiceState === 'thinking'}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2D5A5A] hover:bg-[#234848] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0 transition-colors"
          >
            <Send className="w-5 h-5 text-[#E89D71]" />
            <span>{t('voice.send_btn', 'Send')}</span>
          </button>
        </form>
      </div>

      {/* Suggested Spoken Questions Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E1D8] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A] font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2D5A5A]" />
            <span>{t('voice.preset_heading', 'Tap Any Question to Ask Instantly:')}</span>
          </h3>
          <span className="text-xs text-[#8C867A] font-semibold hidden sm:inline">
            {t('voice.preset_sub', 'One-tap convenience')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {presetPrompts.map((prompt, idx) => {
            const promptText = t(prompt.key);
            const promptDesc = t(prompt.descKey);
            return (
              <button
                key={idx}
                id={`voice-preset-${idx}`}
                onClick={() => handleSendMessage(promptText)}
                className="p-4 rounded-2xl border border-[#E5E1D8] hover:border-[#2D5A5A] bg-[#F2F1EC] hover:bg-white text-left cursor-pointer transition-all duration-150 group shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider block">
                    {prompt.tag}
                  </span>
                  <span className="font-bold text-base text-[#1A1A1A] group-hover:text-[#2D5A5A] block leading-snug">
                    "{promptText}"
                  </span>
                </div>
                <span className="text-xs text-[#5C574F] mt-2 block">
                  {promptDesc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Conversational Chat Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
            {t('voice.chat_history_heading', 'Recent Spoken Conversation')}
          </h3>
          {chatMessages.length > 1 && (
            <button
              onClick={handleClearChat}
              id="voice-clear-conversation-btn"
              className="text-xs font-bold text-[#5C574F] hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('voice.clear_chat', 'Clear History')}</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`bg-white rounded-3xl p-6 border shadow-xs space-y-3 transition-all ${
                  isUser ? 'border-[#2D5A5A]/30 bg-[#2D5A5A]/5' : 'border-[#E5E1D8]'
                }`}
              >
                {/* Header row with avatar and role */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isUser ? 'bg-[#2D5A5A] text-white' : 'bg-[#E89D71] text-[#2C1810]'
                      }`}
                    >
                      {isUser ? 'YOU' : 'AI'}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A]">
                      {isUser ? t('voice.you_asked', 'You Asked:') : t('voice.sahaya_answered', 'SAHAYA Answer:')}
                    </span>
                  </div>

                  {!isUser && (
                    <button
                      onClick={() => handleReplay(msg.text, msg.language)}
                      className="px-3 py-1 rounded-xl bg-[#F2F1EC] hover:bg-[#E5E1D8] text-xs font-bold text-[#2D5A5A] flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Read this answer aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t('voice.listen_again', 'Listen Again')}</span>
                    </button>
                  )}
                </div>

                {/* Message Body */}
                <p className="text-lg text-[#1A1A1A] leading-relaxed font-medium">
                  {msg.text}
                </p>

                {/* Quick Action Tag */}
                {msg.quickAction && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2D5A5A]/10 text-[#2D5A5A] text-xs font-bold border border-[#2D5A5A]/25">
                    <Check className="w-3.5 h-3.5 text-[#2D5A5A]" />
                    <span>Action executed: {msg.quickAction}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking indicator */}
          {voiceState === 'thinking' && (
            <div className="bg-white rounded-3xl p-6 border border-[#2D5A5A]/30 shadow-xs flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-[#2D5A5A] animate-spin" />
              <span className="text-base font-bold text-[#2D5A5A]">
                {t('voice.state_thinking', 'Thinking...')}
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

    </div>
  );
};
