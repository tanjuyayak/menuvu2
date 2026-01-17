import { Link } from 'react-router-dom';
import { t } from '../../../i18n';
import './HomeScreen.css';

export function HomeScreen() {
  return (
    <div className="home-page">
      <header className="home-header">
        <Link to="/" className="home-logo">
          MenuVu
        </Link>
        <nav className="home-nav">
          <Link to="/partner/login" className="home-nav-link">
            {t('common.login')}
          </Link>
        </nav>
      </header>

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
          <Link to="/menu" className="home-secondary-link">
            {t('home.viewMenu')}
          </Link>
        </div>

        <div className="home-features">
          <div className="home-feature">
            <div className="home-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="home-feature-title">{t('home.feature1Title')}</h3>
            <p className="home-feature-description">{t('home.feature1Description')}</p>
          </div>

          <div className="home-feature">
            <div className="home-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="home-feature-title">{t('home.feature2Title')}</h3>
            <p className="home-feature-description">{t('home.feature2Description')}</p>
          </div>

          <div className="home-feature">
            <div className="home-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="home-feature-title">{t('home.feature3Title')}</h3>
            <p className="home-feature-description">{t('home.feature3Description')}</p>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        © 2026 MenuVu. {t('home.allRightsReserved')}
      </footer>
    </div>
  );
}
