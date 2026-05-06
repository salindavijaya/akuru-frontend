// Akuru bilingual translation dictionary
// en = English, si = Sinhala (Unicode)

export const translations = {
  // ─── Navigation ──────────────────────────────────────────────
  'nav.brand': { en: 'Akuru', si: 'අකුරු' },
  'nav.dashboard': { en: 'Dashboard', si: 'උපකරණ පුවරුව' },
  'nav.settings': { en: 'Settings', si: 'සැකසුම්' },
  'nav.logout': { en: 'Sign out', si: 'ඉවත් වන්න' },
  'nav.login': { en: 'Sign in', si: 'ඇතුල් වන්න' },
  'nav.register': { en: 'Get started', si: 'ආරම්භ කරන්න' },

  // ─── Landing page ─────────────────────────────────────────────
  'landing.hero.tag': { en: 'Sinhala OCR', si: 'සිංහල OCR' },
  'landing.hero.headline': { en: 'Turn handwriting\ninto digital text', si: 'අතින් ලියූ\nලේඛන ඩිජිටල් කරන්න' },
  'landing.hero.sub': {
    en: 'Upload a photo of any Sinhala handwritten bill, letter, ledger or invoice — get editable digital text in seconds.',
    si: 'ඕනෑම සිංහල අතින් ලියූ බිල්පතක්, ලිපියක්, ගිණුම් පොතක් හෝ ඉන්වොයිසියක් ඡායාරූපයක් ලෙස ඇතුළත් කරන්න — තත්පර කිහිපයකින් සංස්කරණය කළ හැකි ඩිජිටල් පාඨයක් ලබා ගන්න.',
  },
  'landing.hero.cta': { en: 'Start for free', si: 'නොමිලේ ආරම්භ කරන්න' },
  'landing.hero.demo': { en: 'See how it works', si: 'එය ක්‍රියා කරන ආකාරය බලන්න' },

  'landing.steps.title': { en: 'Three steps to digital', si: 'ඩිජිටල් කිරීමට පියවර තුනක්' },
  'landing.step1.title': { en: 'Photograph', si: 'ඡායාරූපය ගන්න' },
  'landing.step1.desc': { en: 'Take a photo or upload a scan of your Sinhala document', si: 'ඔබේ සිංහල ලේඛනයේ ඡායාරූපයක් ගන්න හෝ ස්කෑනයක් ඇතුළත් කරන්න' },
  'landing.step2.title': { en: 'Process', si: 'සකසන්න' },
  'landing.step2.desc': { en: 'Our AI reads and converts Sinhala handwriting to Unicode text', si: 'අපගේ AI සිංහල අතින් ලිවීම Unicode පාඨයට පරිවර්තනය කරයි' },
  'landing.step3.title': { en: 'Download', si: 'බාගත කරන්න' },
  'landing.step3.desc': { en: 'Get your text as editable DOCX or PDF — ready to use', si: 'ඔබේ පාඨය සංස්කරණය කළ හැකි DOCX හෝ PDF ලෙස ලබා ගන්න' },

  'landing.usecases.title': { en: 'Built for Sri Lankan workplaces', si: 'ශ්‍රී ලාංකික සේවා ස්ථාන සඳහා' },
  'landing.usecase.bills': { en: 'Bills & Receipts', si: 'බිල්පත් සහ රිසිට්' },
  'landing.usecase.letters': { en: 'Official Letters', si: 'නිල ලිපි' },
  'landing.usecase.ledgers': { en: 'Ledgers & Accounts', si: 'ගිණුම් පොත්' },
  'landing.usecase.invoices': { en: 'Invoices & Quotations', si: 'ඉන්වොයිස් සහ මිල ගණන්' },

  // ─── Auth ─────────────────────────────────────────────────────
  'auth.login.title': { en: 'Welcome back', si: 'නැවත සාදරයෙන් පිළිගනිමු' },
  'auth.login.sub': { en: 'Sign in to your Akuru account', si: 'ඔබේ Akuru ගිණුමට ඇතුල් වන්න' },
  'auth.login.email': { en: 'Email address', si: 'විද්‍යුත් තැපෑල' },
  'auth.login.password': { en: 'Password', si: 'මුරපදය' },
  'auth.login.submit': { en: 'Sign in', si: 'ඇතුල් වන්න' },
  'auth.login.noAccount': { en: "Don't have an account?", si: 'ගිණුමක් නැද්ද?' },
  'auth.login.signup': { en: 'Create one', si: 'ගිණුමක් සාදන්න' },

  'auth.register.title': { en: 'Create your account', si: 'ගිණුමක් සාදන්න' },
  'auth.register.sub': { en: 'Free to start. No credit card needed.', si: 'ආරම්භ කිරීමට නොමිලේ. ගෙවීමක් නැත.' },
  'auth.register.name': { en: 'Full name', si: 'සම්පූර්ණ නම' },
  'auth.register.email': { en: 'Email address', si: 'විද්‍යුත් තැපෑල' },
  'auth.register.password': { en: 'Password', si: 'මුරපදය' },
  'auth.register.submit': { en: 'Create account', si: 'ගිණුම සාදන්න' },
  'auth.register.hasAccount': { en: 'Already have an account?', si: 'දැනටමත් ගිණුමක් තිබේද?' },
  'auth.register.login': { en: 'Sign in', si: 'ඇතුල් වන්න' },

  // ─── Dashboard ────────────────────────────────────────────────
  'dash.upload.title': { en: 'Upload document', si: 'ලේඛනය ඇතුළත් කරන්න' },
  'dash.upload.drag': { en: 'Tap to photograph or upload', si: 'ඡායාරූප ගැනීමට හෝ ඇතුළත් කිරීමට ස්පර්ශ කරන්න' },
  'dash.upload.hint': { en: 'JPEG, PNG, PDF up to 20MB', si: 'JPEG, PNG, PDF — 20MB දක්වා' },
  'dash.upload.btn': { en: 'Choose file / Camera', si: 'ගොනුව / කැමරාව' },
  'dash.upload.format': { en: 'Output format', si: 'ප්‍රතිදාන ආකෘතිය' },
  'dash.upload.submit': { en: 'Transcribe now', si: 'දැන් පෙළට හරවන්න' },
  'dash.upload.uploading': { en: 'Uploading…', si: 'ඇතුළත් කරමින්…' },

  'dash.jobs.title': { en: 'Recent jobs', si: 'මෑත රැකියා' },
  'dash.jobs.empty': { en: 'No jobs yet. Upload your first document above.', si: 'තවම රැකියා නොමැත. ඉහත ඔබේ පළමු ලේඛනය ඇතුළත් කරන්න.' },
  'dash.jobs.filename': { en: 'File', si: 'ගොනුව' },
  'dash.jobs.status': { en: 'Status', si: 'තත්ත්වය' },
  'dash.jobs.date': { en: 'Date', si: 'දිනය' },
  'dash.jobs.action': { en: 'View', si: 'බලන්න' },

  // ─── Job result ───────────────────────────────────────────────
  'job.title': { en: 'Transcription result', si: 'පෙළ හැරවීමේ ප්‍රතිඵලය' },
  'job.status.pending': { en: 'Waiting', si: 'රැඳී සිටීම' },
  'job.status.processing': { en: 'Processing…', si: 'සකසමින්…' },
  'job.status.completed': { en: 'Completed', si: 'සම්පූර්ණයි' },
  'job.status.failed': { en: 'Failed', si: 'අසාර්ථකයි' },
  'job.text.title': { en: 'Extracted text', si: 'ලබාගත් පාඨය' },
  'job.text.copy': { en: 'Copy text', si: 'පාඨය පිටපත් කරන්න' },
  'job.text.copied': { en: 'Copied!', si: 'පිටපත් විය!' },
  'job.download.docx': { en: 'Download DOCX', si: 'DOCX බාගත කරන්න' },
  'job.download.pdf': { en: 'Download PDF', si: 'PDF බාගත කරන්න' },
  'job.confidence.high': { en: 'High confidence', si: 'ඉහළ විශ්වාසදායකත්වය' },
  'job.confidence.medium': { en: 'Medium confidence', si: 'මධ්‍යම විශ්වාසදායකත්වය' },
  'job.confidence.low': { en: 'Low confidence', si: 'අඩු විශ්වාසදායකත්වය' },
  'job.pages': { en: 'pages', si: 'පිටු' },
  'job.expires': { en: 'Files expire', si: 'ගොනු කල් ඉකුත් වෙයි' },
  'job.back': { en: 'Back to dashboard', si: 'උපකරණ පුවරුවට ආපසු' },
  'job.polling': { en: 'Checking status…', si: 'තත්ත්වය පරීක්ෂා කරමින්…' },

  // ─── Settings ─────────────────────────────────────────────────
  'settings.title': { en: 'Settings', si: 'සැකසුම්' },
  'settings.profile.title': { en: 'Profile', si: 'පැතිකඩ' },
  'settings.keys.title': { en: 'API Keys', si: 'API යතුරු' },
  'settings.keys.create': { en: 'Create key', si: 'යතුර සාදන්න' },
  'settings.keys.name': { en: 'Key name', si: 'යතුර නාමය' },
  'settings.keys.revoke': { en: 'Revoke', si: 'අවලංගු කරන්න' },
  'settings.keys.empty': { en: 'No API keys. Create one below.', si: 'API යතුරු නොමැත. පහතින් සාදන්න.' },
  'settings.keys.warning': { en: 'Copy this key now — it will not be shown again.', si: 'මෙම යතුර දැන් පිටපත් කරන්න — නැවත නොපෙන්වයි.' },
  'settings.lang.title': { en: 'Language', si: 'භාෂාව' },
  'settings.lang.en': { en: 'English', si: 'ඉංග්‍රීසි' },
  'settings.lang.si': { en: 'Sinhala', si: 'සිංහල' },

  // ─── Generic ──────────────────────────────────────────────────
  'generic.loading': { en: 'Loading…', si: 'පූරණය වෙමින්…' },
  'generic.error': { en: 'Something went wrong', si: 'දෝෂයක් ඇති විය' },
  'generic.retry': { en: 'Try again', si: 'නැවත උත්සාහ කරන්න' },
  'generic.cancel': { en: 'Cancel', si: 'අවලංගු කරන්න' },
  'generic.save': { en: 'Save', si: 'සුරකින්න' },
  'generic.delete': { en: 'Delete', si: 'මකන්න' },
  'generic.confirm': { en: 'Confirm', si: 'තහවුරු කරන්න' },
  'generic.close': { en: 'Close', si: 'වසන්න' },
}

/**
 * Get a translation string for a given key and locale.
 * Falls back to English if Sinhala translation is missing.
 */
export const t = (key, locale = 'en') => {
  const entry = translations[key]
  if (!entry) return key
  return entry[locale] || entry['en'] || key
}
