import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese' }
];

const baseNav = {
  overview: "Home",
  dashboard: "Dashboard",
  gis: "GIS Intelligence",
  research: "Research Repository",
  policies: "Policy Registry",
  datasets: "Spatial Datasets",
  policy_lab: "Policy Innovation Lab",
  ai_copilot: "AI Research Copilot",
  collaboration: "Collaboration Hub",
  analytics: "Executive Analytics",
  blockchain: "Blockchain Trust",
  api_portal: "Open API Portal",
  cybersecurity: "Cybersecurity",
  admin: "Super Admin Console",
  login: "Official Sign-In",
  register: "Register Delegate"
};

const resources = {
  en: {
    translation: {
      nav: baseNav,
      portal: {
        title: "National Digital Platform for Land Governance",
        ministry: "Ministry of Rural Development & Department of Land Resources",
        gov: "Government of India",
        subtitle: "Evidence-Based Policy Innovation, Geospatial Intelligence & Research Ecosystem"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        overview: "मुख्य पृष्ठ",
        dashboard: "डैशबोर्ड",
        gis: "जीआईएस इंटेलिजेंस",
        research: "अनुसंधान भंडार",
        policies: "नीति रजिस्ट्री",
        datasets: "स्थानिक डेटासेट",
        policy_lab: "नीति नवाचार लैब",
        ai_copilot: "एआई शोध सहायक",
        collaboration: "सहयोग केंद्र",
        analytics: "कार्यकारी विश्लेषण",
        blockchain: "ब्लॉकचेन ट्रस्ट",
        api_portal: "ओपन एपीआई पोर्टल",
        cybersecurity: "साइबर सुरक्षा",
        admin: "प्रशासन कंसोल",
        login: "आधिकारिक लॉगिन",
        register: "पंजीकरण"
      },
      portal: {
        title: "भूमि शासन के लिए राष्ट्रीय डिजिटल मंच",
        ministry: "ग्रामीण विकास मंत्रालय एवं भूमि संसाधन विभाग",
        gov: "भारत सरकार",
        subtitle: "साक्ष्य-आधारित नीति नवाचार, भू-स्थानिक बुद्धिमत्ता और अनुसंधान पारिस्थितिकी तंत्र"
      }
    }
  },
  ta: {
    translation: {
      nav: {
        overview: "முகப்பு",
        dashboard: "டாஷ்போர்டு",
        gis: "GIS நுண்ணறிவு",
        research: "ஆராய்ச்சி களஞ்சியம்",
        policies: "கொள்கை பதிவேடு",
        datasets: "இடஞ்சார்ந்த தரவுத்தொகுப்புகள்",
        policy_lab: "கொள்கை புத்தாக்க ஆய்வகம்",
        ai_copilot: "AI ஆராய்ச்சி உதவியாளர்",
        collaboration: "கூட்டுப்பணி மையம்",
        analytics: "நிர்வாக பகுப்பாய்வு",
        blockchain: "பிளாக்செயின் சரிபார்ப்பு",
        api_portal: "திறந்த API தளம்",
        cybersecurity: "சைபர் பாதுகாப்பு",
        admin: "நிர்வாக கன்சோல்",
        login: "உள்நுழைவு",
        register: "பதிவு செய்க"
      },
      portal: {
        title: "நில நிர்வாகத்திற்கான தேசிய டிஜிட்டல் தளம்",
        ministry: "ஊரக வளர்ச்சி அமைச்சகம் மற்றும் நில வளங்கள் துறை",
        gov: "இந்திய அரசு",
        subtitle: "சான்றுகள் அடிப்படையிலான கொள்கை புத்தாக்கம் மற்றும் புவிசார் நுண்ணறிவு"
      }
    }
  },
  te: {
    translation: {
      nav: {
        overview: "హోమ్",
        dashboard: "డాష్‌బోర్డ్",
        gis: "GIS ఇంటెలిజెన్స్",
        research: "పరిశోధనా భాండాగారం",
        policies: "పాలసీ రిజిస్ట్రీ",
        datasets: "స్థానిక డేటాసెట్‌లు",
        policy_lab: "పాలసీ ఇన్నోవేషన్ ల్యాబ్",
        ai_copilot: "AI రీసెర్చ్ కోపైలట్",
        collaboration: "సహకార హబ్",
        analytics: "కార్యనిర్వాహక విశ్లేషణలు",
        blockchain: "బ్లాక్‌చెయిన్ ట్రస్ట్",
        api_portal: "ఓపెన్ API పోర్టల్",
        cybersecurity: "సైబర్ భద్రత",
        admin: "అడ్మిన్ కన్సోల్",
        login: "లాగిన్",
        register: "నమోదు"
      }
    }
  },
  kn: {
    translation: {
      nav: {
        overview: "ಮುಖಪುಟ",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        gis: "GIS ಇಂಟೆಲಿಜೆನ್ಸ್",
        research: "ಸಂಶೋಧನಾ ಭಂಡಾರ",
        policies: "ನೀತಿ ನೋಂದಣಿ",
        datasets: "ಪ್ರಾದೇಶಿಕ ಡೇಟಾಸೆಟ್‌ಗಳು",
        policy_lab: "ನೀತಿ ಇನ್ನೋವೇಶನ್ ಲ್ಯಾಬ್",
        ai_copilot: "AI ಸಂಶೋಧನಾ ಸಹಾಯಕ",
        collaboration: "ಸಹಯೋಗ ಕೇಂದ್ರ",
        analytics: "ವಿಶ್ಲೇಷಣೆ",
        blockchain: "ಬ್ಲಾಕ್‌ಚೈನ್ ವಿಶ್ವಾಸಾರ್ಹತೆ",
        api_portal: "ಮುಕ್ತ API ಪೋರ್ಟಲ್",
        cybersecurity: "ಸೈಬರ್ ಭದ್ರತೆ",
        admin: "ನಿರ್ವಾಹಕ ಕನ್ಸೋಲ್",
        login: "ಲಾಗಿನ್",
        register: "ನೋಂದಣಿ"
      }
    }
  },
  ml: {
    translation: {
      nav: {
        overview: "ഹോം",
        dashboard: "ഡാഷ്‌ബോർഡ്",
        gis: "ജിഐഎസ് ഇന്റലിജൻസ്",
        research: "ഗവേഷണ ശേഖരം",
        policies: "നയ രജിസ്ട്രി",
        datasets: "ഡാറ്റാസെറ്റുകൾ",
        policy_lab: "പോളിസി ഇന്നൊവേഷൻ ലാബ്",
        ai_copilot: "എഐ ഗവേഷണ സഹായി",
        collaboration: "സഹകരണ കേന്ദ്രം",
        analytics: "അനലിറ്റിക്സ്",
        blockchain: "ബ്ലോക്ക്ചെയിൻ ട്രസ്റ്റ്",
        api_portal: "ഓപ്പൺ എപിഐ പോർട്ടൽ",
        cybersecurity: "സൈബർ സുരക്ഷ",
        admin: "അഡ്മിൻ കൺസോൾ",
        login: "ലോഗിൻ",
        register: "രജിസ്ട്രേഷൻ"
      }
    }
  },
  mr: {
    translation: {
      nav: {
        overview: "मुख्यपृष्ठ",
        dashboard: "डॅशबोर्ड",
        gis: "जीआयएस इंटेलिजन्स",
        research: "संशोधन भांडार",
        policies: "धोरण नोंदणी",
        datasets: "भू-स्थानिक डेटासेट",
        policy_lab: "धोरण नवोपक्रम लॅब",
        ai_copilot: "एआय संशोधन सहाय्यक",
        collaboration: "सहकार्य केंद्र",
        analytics: "कार्यकारी विश्लेषण",
        blockchain: "ब्लॉकचेन ट्रस्ट",
        api_portal: "ओपन एपीआय पोर्टल",
        cybersecurity: "सायबर सुरक्षा",
        admin: "प्रशासन पॅनेल",
        login: "लॉगिन",
        register: "नोंदणी"
      }
    }
  },
  gu: {
    translation: {
      nav: {
        overview: "મુખ્ય પૃષ્ઠ",
        dashboard: "ડેશબોર્ડ",
        gis: "જીઆઈએસ ઇન્ટેલિજન્સ",
        research: "સંશોધન સંગ્રહ",
        policies: "નીતિ રજિસ્ટ્રી",
        datasets: "ડેટાસેટ્સ",
        policy_lab: "નીતિ ઇનોવેશન લેબ",
        ai_copilot: "એઆઈ સંશોધન સહાયક",
        collaboration: "સહયોગ કેન્દ્ર",
        analytics: "વિશ્લેષણ",
        blockchain: "બ્લોકચેન ચકાસણી",
        api_portal: "ઓપન એપીઆઈ પોર્ટલ",
        cybersecurity: "સાયબર સુરક્ષા",
        admin: "એડમિન કન્સોલ",
        login: "લૉગિન",
        register: "નોંધણી"
      }
    }
  },
  bn: {
    translation: {
      nav: {
        overview: "হোম",
        dashboard: "ড্যাশবোর্ড",
        gis: "জিআইএস ইন্টেলিজেন্স",
        research: "গবেষণা ভাণ্ডার",
        policies: "নীতি রেজিস্ট্রি",
        datasets: "স্থানিক ডেটাসেট",
        policy_lab: "পলিসি ইনোভেশন ল্যাব",
        ai_copilot: "এআই গবেষণা সহকারী",
        collaboration: "সহযোগিতা হাব",
        analytics: "বিশ্লেষণ",
        blockchain: "ব্লকচেইন ট্রাস্ট",
        api_portal: "ওপেন এপিআই পোর্টাল",
        cybersecurity: "সাইবার নিরাপত্তা",
        admin: "প্রশাসন কনসোল",
        login: "লগইন",
        register: "নিবন্ধন"
      }
    }
  },
  pa: {
    translation: {
      nav: {
        overview: "ਮੁੱਖ ਪੰਨਾ",
        dashboard: "ਡੈਸ਼ਬੋਰਡ",
        gis: "ਜੀਆਈਐਸ ਇੰਟੈਲੀਜੈਂਸ",
        research: "ਖੋਜ ਭੰਡਾਰ",
        policies: "ਨੀਤੀ ਰਜਿਸਟਰੀ",
        datasets: "ਸਥਾਨਿਕ ਡਾਟਾਸੈਟ",
        policy_lab: "ਨੀਤੀ ਨਵੀਨਤਾ ਲੈਬ",
        ai_copilot: "ਏਆਈ ਖੋਜ ਸਹਾਇਕ",
        collaboration: "ਸਹਿਯੋਗ ਕੇਂਦਰ",
        analytics: "ਕਾਰਜਕਾਰੀ ਵਿਸ਼ਲੇਸ਼ਣ",
        blockchain: "ਬਲਾਕਚੇਨ ਟਰੱਸਟ",
        api_portal: "ਓਪਨ ਏਪੀਆਈ ਪੋਰਟਲ",
        cybersecurity: "ਸਾਈਬਰ ਸੁਰੱਖਿਆ",
        admin: "ਐਡਮਿਨ ਕੰਸੋਲ",
        login: "ਲਾਗਇਨ",
        register: "ਰਜਿਸਟਰ"
      }
    }
  },
  or: {
    translation: {
      nav: {
        overview: "ମୂଳ ପୃଷ୍ଠା",
        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        gis: "ଜିଆଇଏସ୍ ଇଣ୍ଟେଲିଜେନ୍ସ",
        research: "ଗବେଷଣା ଭଣ୍ଡାର",
        policies: "ନୀତି ପଞ୍ଜିକା",
        datasets: "ସ୍ଥାନିକ ତଥ୍ୟସେଟ୍",
        policy_lab: "ନୀତି ଇନୋଭେସନ ଲ୍ୟାବ୍",
        ai_copilot: "ଏଆଇ ଗବେଷଣା ସହାୟକ",
        collaboration: "ସହଯୋଗ କେନ୍ଦ୍ର",
        analytics: "ବିଶ୍ଳେଷଣ",
        blockchain: "ବ୍ଲକଚେନ୍ ଟ୍ରଷ୍ଟ",
        api_portal: "ଓପନ ଏପିଆଇ ପୋର୍ଟାଲ",
        cybersecurity: "ସାଇବର ସୁରକ୍ଷା",
        admin: "ପ୍ରଶାସକ କନସୋଲ",
        login: "ଲଗଇନ",
        register: "ପଞ୍ଜିକରଣ"
      }
    }
  },
  as: {
    translation: {
      nav: {
        overview: "মুখ্য পৃষ্ঠা",
        dashboard: "ডেচবৰ্ড",
        gis: "জিআইএছ ইনটেলিজেন্স",
        research: "গৱেষণা সংগ্ৰহ",
        policies: "নীতি পঞ্জীয়ন",
        datasets: "স্থানিক তথ্যভাণ্ডাৰ",
        policy_lab: "নীতি উদ্ভাৱন পৰীক্ষাগাৰ",
        ai_copilot: "এআই গৱেষণা সহায়ক",
        collaboration: "সহযোগিতা কেন্দ্ৰ",
        analytics: "বিশ্লেষণ",
        blockchain: "ব্লকচেইন বিশ্বাস",
        api_portal: "মুক্ত এপিআই পৰ্টেল",
        cybersecurity: "চাইবাৰ সুৰক্ষা",
        admin: "প্ৰশাসক কনচোল",
        login: "লগইন",
        register: "পঞ্জীয়ন"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
