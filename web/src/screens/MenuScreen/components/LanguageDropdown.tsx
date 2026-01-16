import { getAvailableLanguages, getCurrentLanguage } from '../../../i18n';
import './LanguageDropdown.css';

type LanguageDropdownProps = {
  currentLang: string;
  onLanguageChange: (langId: string) => void;
};

export const LanguageDropdown = ({
  currentLang,
  onLanguageChange,
}: LanguageDropdownProps) => {
  const languages = getAvailableLanguages();

  return (
    <div className="language-buttons">
      {languages.map(lang => {
        const isSelected = currentLang === lang.id;
        const langCode = lang.id.toUpperCase();
        
        return (
          <button
            key={lang.id}
            className={`language-button ${isSelected ? 'selected' : ''}`}
            onClick={() => onLanguageChange(lang.id)}
            aria-label={`Select ${lang.name}`}
            aria-pressed={isSelected}
          >
            {langCode}
          </button>
        );
      })}
    </div>
  );
};
