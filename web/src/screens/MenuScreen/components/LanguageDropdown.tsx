import { useState, useRef, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languages = getAvailableLanguages();
  const currentLanguage = languages.find(lang => lang.id === currentLang);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (langId: string) => {
    onLanguageChange(langId);
    setIsOpen(false);
  };

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <button
        className="language-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="language-dropdown-text">{currentLanguage?.name || 'EN'}</span>
        <span className={`language-dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map(lang => (
            <button
              key={lang.id}
              className={`language-dropdown-item ${currentLang === lang.id ? 'active' : ''}`}
              onClick={() => handleSelect(lang.id)}
              role="option"
              aria-selected={currentLang === lang.id}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
