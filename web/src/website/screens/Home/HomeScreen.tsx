import { Link } from 'react-router-dom';
import { t } from '../../../i18n';
import './HomeScreen.css';

export function HomeScreen() {
  return (
    <div className="home-page">
      <main className="home-main">
        <h1 className="home-hero-title">{t('home.heroTitle')}</h1>
        <p className="home-hero-subtitle">{t('home.heroSubtitle')}</p>
        
        <div className="home-cta-container">
          <Link to="/partner/login" className="home-cta-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            {t('home.partnerLogin')}
          </Link>
          <Link to="/menu" className="home-secondary-link" target="_blank" rel="noopener noreferrer">
            {t('home.viewMenu')}
          </Link>
        </div>
      </main>

      <footer className="home-footer">
        © 2026 menuvu. {t('home.allRightsReserved')}
      </footer>
    </div>
  );
}
