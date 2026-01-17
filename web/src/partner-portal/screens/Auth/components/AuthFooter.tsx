import { t } from '../../../../i18n';
import './AuthFooter.css';

export function AuthFooter() {
  return (
    <div className="auth-footer">
      <p className="auth-footer-text">
        {t('auth.privacyPolicy')}{' '}
        <a href="/terms" className="auth-footer-link">
          {t('auth.termsAndConditions')}
        </a>{' '}
        {t('auth.and')}{' '}
        <a href="/privacy" className="auth-footer-link">
          {t('auth.privacyPolicyLink')}
        </a>
      </p>
    </div>
  );
}
