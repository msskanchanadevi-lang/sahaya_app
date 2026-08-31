import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Contextual fallback helper in case API key is absent or network fails
function getContextualFallback(question: string, language: string): string {
  const q = question.toLowerCase();
  const lang = (language || 'en').toLowerCase();

  // QR Code
  if (q.includes('qr') || q.includes('क्यूआर') || q.includes('ஸ்கேன்') || q.includes('స్కాన్')) {
    if (lang === 'ta') {
      return 'QR குறியீட்டை ஸ்கேன் செய்ய: உங்கள் ஃபோன் கேமரா (Camera) செயலியைத் திறந்து, சதுர குறியீட்டின் மீது காட்டவும். திரையில் ஒரு மஞ்சள் இணைப்பு தோன்றும், அதை ஒருமுறை மெதுவாகத் தட்டவும்.';
    }
    if (lang === 'hi') {
      return 'QR कोड स्कैन करने के लिए: अपने फोन का कैमरा खोलें और उसे चौकोर QR कोड के सामने रखें। स्क्रीन पर आने वाले पीले लिंक पर हल्के से टैप करें।';
    }
    if (lang === 'te') {
      return 'QR కోడ్ స్కాన్ చేయడానికి: మీ ఫోన్ కెమెరా తెరిచి, చతురస్ర కోడ్ ముందు ఉంచండి. స్క్రీన్‌పై కనిపించే పసుపు లింక్‌పై నొక్కండి.';
    }
    if (lang === 'ml') {
      return 'QR കോഡ് സ്കാൻ ചെയ്യാൻ: നിങ്ങളുടെ ഫോൺ ക്യാമറ തുറന്ന് കോഡിന് നേരെ പിടിക്കുക. സ്ക്രീനിൽ കാണുന്ന ലിങ്കിൽ തൊടുക.';
    }
    if (lang === 'mr') {
      return 'QR कोड स्कॅन करण्यासाठी: तुमच्या फोनचा कॅमेरा उघडा आणि तो कोडसमोर धरा. स्क्रीनवर दिसणाऱ्या लिंकवर टॅप करा.';
    }
    return 'To scan a QR code: Open your phone Camera app and point it steadily at the square code. Tap the small yellow link banner that appears on your screen.';
  }

  // Text size / Magnification
  if (q.includes('text') || q.includes('big') || q.includes('font') || q.includes('अक्षर') || q.includes('எழுத்து') || q.includes('అక్షరం')) {
    if (lang === 'ta') {
      return 'நான் எழுத்து அளவை மாற்றுகிறேன். மேல் வலதுபுறத்தில் உள்ள "A+" பொத்தானைத் தட்டுவதன் மூலம் எழுத்துக்களை பெரிதாக்கலாம்.';
    }
    if (lang === 'hi') {
      return 'अक्षर बड़े करने के लिए: स्क्रीन के ऊपर या नीचे दिए गए "A+" या "A++" बटन को दबाएँ। सभी अक्षर तुरंत बड़े और साफ़ हो जाएँगे।';
    }
    if (lang === 'te') {
      return 'అక్షరాలు పెద్దవి చేయడానికి: పైన లేదా క్రింద ఉన్న "A+" బటన్‌ను నొక్కండి. అక్షరాలు వెంటనే పెద్దవి అవుతాయి.';
    }
    if (lang === 'ml') {
      return 'അക്ഷരങ്ങൾ വലുതാക്കാൻ: മുകളിലെ "A+" ബട്ടണിൽ തൊടുക. അക്ഷരങ്ങൾ പെട്ടെന്ന് വലുതാകും.';
    }
    if (lang === 'mr') {
      return 'अक्षरे मोठी करण्यासाठी: वरील "A+" बटणावर टॅप करा. सर्व अक्षरे लगेच मोठी होतील.';
    }
    return 'To make text bigger: Tap the "A+" or "A++" button on the top right or bottom tool bar. Text will instantly enlarge across the entire screen.';
  }

  // High contrast
  if (q.includes('contrast') || q.includes('कंट्रास्ट') || q.includes('மாறுபாடு')) {
    if (lang === 'ta') {
      return 'உயர் மாறுபாட்டை (High Contrast) இயக்க மேலே உள்ள நிலா/சூரியன் பொத்தானைத் தட்டவும். இது கூர்மையான தெளிவைத் தரும்.';
    }
    if (lang === 'hi') {
      return 'उच्च कंट्रास्ट चालू करने के लिए: ऊपर दिए गए चंद्रमा/सूर्य आइकन पर टैप करें। इससे काले बैकग्राउंड पर स्पष्ट पीले और सफ़ेद अक्षर दिखेंगे।';
    }
    return 'To toggle High Contrast mode, tap the Sun/Moon icon in the navigation bar. This sharpens all borders and makes reading effortless.';
  }

  // Video call / WhatsApp
  if (q.includes('video') || q.includes('call') || q.includes('whatsapp') || q.includes('कॉल') || q.includes('அழைப்பு')) {
    if (lang === 'ta') {
      return 'வீடியோ அழைப்பு செய்ய: வாட்ஸ்அப் (WhatsApp) செயலியைத் திறந்து, உங்கள் குடும்ப உறுப்பினரின் பெயரைத் தட்டி, மேல் வலதுபுறத்தில் உள்ள வீடியோ கேமரா ஐகானைத் தட்டவும்.';
    }
    if (lang === 'hi') {
      return 'वीडियो कॉल करने के लिए: व्हाट्सएप खोलें, अपने परिजन के नाम पर टैप करें, और ऊपर दाईं ओर दिए गए वीडियो कैमरा आइकन को दबाएँ।';
    }
    if (lang === 'te') {
      return 'వీడియో కాల్ చేయడానికి: వాట్సాప్ తెరిచి, మీ కుటుంబ సభ్యుల పేరుపై నొక్కి, పైన ఉన్న వీడియో కెమెరా చిహ్నాన్ని నొక్కండి.';
    }
    return 'To start a video call: Open WhatsApp, tap on your family member\'s name, and tap the Video Camera icon at the top right of your screen.';
  }

  // General default warm friendly response
  if (lang === 'ta') {
    return 'வணக்கம்! நான் சகாயா. தொழில்நுட்பத்தை மிக எளிமையாகவும் பொறுமையாகவும் கற்றுக்கொள்ள நான் உங்களுக்கு உதவுவேன். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?';
  }
  if (lang === 'hi') {
    return 'नमस्ते! मैं सहाय हूँ। स्मार्टफोन और ऐप्स को बिना किसी डर के सीखने में मैं आपकी पूरी मदद करूँगा। आप क्या सीखना चाहते हैं?';
  }
  if (lang === 'te') {
    return 'నమస్కారం! నేను సహాయ. స్మార్ట్‌ఫోన్ సులభంగా నేర్చుకోవడానికి నేను మీకు తోడుగా ఉంటాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?';
  }
  if (lang === 'ml') {
    return 'നമസ്കാരം! ഞാൻ സഹായ. സ്മാർട്ട്ഫോൺ എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ ഞാൻ സഹായിക്കാം. എന്താണ് അറിയേണ്ടത്?';
  }
  if (lang === 'mr') {
    return 'नमस्कार! मी सहाय आहे. स्मार्टफोन आणि तंत्रज्ञान शांतपणे शिकण्यासाठी मी तुमच्या सोबत आहे. तुम्हाला काय विचारायचे आहे?';
  }

  return 'Hello! I am SAHAYA, your digital companion. I am here to help you navigate your phone, payments, and apps step by step with complete patience. What would you like to do today?';
}

// Conversational Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, language = 'en' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || '';

    const langNameMap: Record<string, string> = {
      en: 'English',
      ta: 'Tamil (தமிழ்)',
      hi: 'Hindi (हिन्दी)',
      te: 'Telugu (తెలుగు)',
      ml: 'Malayalam (മലയാളം)',
      mr: 'Marathi (मराठी)',
    };

    const targetLanguageName = langNameMap[language] || 'English';

    // If no API key configured, use intelligent contextual response
    if (!process.env.GEMINI_API_KEY) {
      console.log('No GEMINI_API_KEY found, using contextual senior assistant fallback.');
      const fallbackReply = getContextualFallback(userPrompt, language);
      return res.json({
        reply: fallbackReply,
        source: 'fallback',
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction = `You are SAHAYA, a deeply empathetic, patient, warm, and polite digital companion created specifically for elderly adults aged 60+.

Core Personality & Rules:
1. Voice & Tone: Gentle, reassuring, respectful, and crystal-clear. Speak like a loving family member or patient friend sitting beside them.
2. Language: You MUST reply directly in ${targetLanguageName}. Use natural, warm, polite, and culturally appropriate phrasing suitable for elders.
3. Keep it simple: Strictly avoid confusing computer jargon (e.g. say "Settings app" instead of "configuration utility", "tap the green button" instead of "execute call handler").
4. Bite-sized pacing: Give 1 or 2 simple steps at a time. Never overwhelm with long walls of text.
5. Reassurance: If they are anxious about making mistakes or losing money, reassure them with calm dignity ("Don't worry, you are doing great. Let's do it one step at a time.").
6. Help with everyday tech: scanning QR codes, video calling children/grandchildren, WhatsApp messaging, taking/sending photos, setting medicine alarms, adjusting phone volume/brightness, changing text size, recognizing safe vs scam SMS.
7. Brevity: Keep responses within 2-4 sentences so that it is comfortable to read and spoken aloud cleanly without fatigue.`;

    // Format chat history into contents array
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    });

    const replyText = response.text || getContextualFallback(userPrompt, language);

    return res.json({
      reply: replyText.trim(),
      source: 'gemini',
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error?.message || error);
    const { messages, language = 'en' } = req.body;
    const lastPrompt = messages?.[messages.length - 1]?.content || '';
    const fallbackReply = getContextualFallback(lastPrompt, language);

    return res.json({
      reply: fallbackReply,
      source: 'fallback_error',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAHAYA Server running on port ${PORT}`);
  });
}

startServer();
