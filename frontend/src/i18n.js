import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        overview: "Overview",
        dashboard: "Dashboard",
        simulator: "Policy Simulator",
        ai_assistant: "AI Assistant",
        gis_dashboard: "GIS Dashboard",
        research: "Research",
        policies: "Policies",
        datasets: "Datasets",
        admin_portal: "Admin Portal",
        login: "Login",
        register: "Register Portal"
      },
      hero: {
        title: "National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance",
        subtitle: "Empowering stakeholders with data-driven insights."
      }
    }
  },
  hi: {
    translation: {
      nav: {
        overview: "अवलोकन",
        dashboard: "डैशबोर्ड",
        simulator: "नीति सिम्युलेटर",
        ai_assistant: "एआई सहायक",
        gis_dashboard: "जीआईएस डैशबोर्ड",
        research: "अनुसंधान",
        policies: "नीतियां",
        datasets: "डेटासेट",
        admin_portal: "व्यवस्थापक पोर्टल",
        login: "लॉगिन",
        register: "पंजीकरण पोर्टल"
      }
    }
  },
  ta: {
    translation: {
      nav: {
        overview: "கண்ணோட்டம்",
        dashboard: "டாஷ்போர்டு",
        simulator: "கொள்கை சிமுலேட்டர்",
        ai_assistant: "AI உதவியாளர்",
        gis_dashboard: "GIS டாஷ்போர்டு",
        research: "ஆராய்ச்சி",
        policies: "கொள்கைகள்",
        datasets: "தரவுத்தொகுப்புகள்",
        admin_portal: "நிர்வாக போர்டல்",
        login: "உள்நுழைய",
        register: "பதிவு போர்டல்"
      }
    }
  },
  te: { translation: { nav: { overview: "అవలోకనం", dashboard: "డాష్‌బోర్డ్", simulator: "విధాన సిమ్యులేటర్", ai_assistant: "AI అసిస్టెంట్", gis_dashboard: "GIS డాష్‌బోర్డ్", research: "పరిశోధన", policies: "విధానాలు", datasets: "డేటాసెట్‌లు", admin_portal: "అడ్మిన్ పోర్టల్", login: "లాగిన్", register: "నమోదు" } } },
  kn: { translation: { nav: { overview: "ಅವಲೋಕನ", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", simulator: "ನೀತಿ ಸಿಮ್ಯುಲೇಟರ್", ai_assistant: "AI ಸಹಾಯಕ", gis_dashboard: "GIS ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", research: "ಸಂಶೋಧನೆ", policies: "ನೀತಿಗಳು", datasets: "ಡೇಟಾಸೆಟ್‌ಗಳು", admin_portal: "ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್", login: "ಲಾಗಿನ್", register: "ನೋಂದಣಿ" } } },
  ml: { translation: { nav: { overview: "അവലോകനം", dashboard: "ഡാഷ്‌ബോർഡ്", simulator: "നയം സിമുലേറ്റർ", ai_assistant: "AI അസിസ്റ്റൻ്റ്", gis_dashboard: "GIS ഡാഷ്‌ബോർഡ്", research: "ഗവേഷണം", policies: "നയങ്ങൾ", datasets: "ഡാറ്റാസെറ്റുകൾ", admin_portal: "അഡ്മിൻ പോർട്ടൽ", login: "ലോഗിൻ", register: "രജിസ്റ്റർ" } } },
  mr: { translation: { nav: { overview: "आढावा", dashboard: "डॅशबोर्ड", simulator: "धोरण सिम्युलेटर", ai_assistant: "AI सहाय्यक", gis_dashboard: "GIS डॅशबोर्ड", research: "संशोधन", policies: "धोरणे", datasets: "डेटासेट", admin_portal: "अॅडमिन पोर्टल", login: "लॉगिन", register: "नोंदणी" } } },
  gu: { translation: { nav: { overview: "ઝાંખી", dashboard: "ડેશબોર્ડ", simulator: "પોલિસી સિમ્યુલેટર", ai_assistant: "AI સહાયક", gis_dashboard: "GIS ડેશબોર્ડ", research: "સંશોધન", policies: "નીતિઓ", datasets: "ડેટાસેટ્સ", admin_portal: "એડમિન પોર્ટલ", login: "લૉગિન", register: "નોંધણી" } } },
  bn: { translation: { nav: { overview: "ওভারভিউ", dashboard: "ড্যাশবোর্ড", simulator: "নীতি সিমুলেটর", ai_assistant: "এআই সহকারী", gis_dashboard: "GIS ড্যাশবোর্ড", research: "গবেষণা", policies: "নীতিমালা", datasets: "ডেটাসেট", admin_portal: "অ্যাডমিন পোর্টাল", login: "লগইন", register: "নিবন্ধন" } } },
  pa: { translation: { nav: { overview: "ਸੰਖੇਪ ਜਾਣਕਾਰੀ", dashboard: "ਡੈਸ਼ਬੋਰਡ", simulator: "ਨੀਤੀ ਸਿਮੂਲੇਟਰ", ai_assistant: "AI ਸਹਾਇਕ", gis_dashboard: "GIS ਡੈਸ਼ਬੋਰਡ", research: "ਖੋਜ", policies: "ਨੀਤੀਆਂ", datasets: "ਡਾਟਾਸੈਟ", admin_portal: "ਐਡਮਿਨ ਪੋਰਟਲ", login: "ਲਾਗਇਨ", register: "ਰਜਿਸਟਰ" } } },
  or: { translation: { nav: { overview: "ସମୀକ୍ଷା", dashboard: "ଡ୍ୟାସବୋର୍ଡ", simulator: "ନୀତି ସିମୁଲେଟର", ai_assistant: "AI ସହାୟକ", gis_dashboard: "GIS ଡ୍ୟାସବୋର୍ଡ", research: "ଗବେଷଣା", policies: "ନୀତି", datasets: "ଡାଟାସେଟ୍", admin_portal: "ଆଡମିନ୍ ପୋର୍ଟାଲ୍", login: "ଲଗଇନ୍", register: "ପଞ୍ଜିକରଣ" } } },
  as: { translation: { nav: { overview: "অৱলোকন", dashboard: "ডেচবৰ্ড", simulator: "নীতি চিমুলেটৰ", ai_assistant: "AI সহায়ক", gis_dashboard: "GIS ডেচবৰ্ড", research: "গৱেষণা", policies: "নীতিসমূহ", datasets: "ডেটাসেট", admin_portal: "এডমিন পৰ্টেল", login: "লগইন", register: "পঞ্জীয়ন" } } },
  ur: { translation: { nav: { overview: "جائزہ", dashboard: "ڈیش بورڈ", simulator: "پالیسی سمیلیٹر", ai_assistant: "AI اسسٹنٹ", gis_dashboard: "GIS ڈیش بورڈ", research: "تحقیق", policies: "پالیسیاں", datasets: "ڈیٹا سیٹ", admin_portal: "ایڈمن پورٹل", login: "لاگ ان", register: "رجسٹر" } } }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
