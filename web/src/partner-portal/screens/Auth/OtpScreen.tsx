import { useState } from 'react';
import { t } from '../../../i18n';
import { AuthFooter } from './components/AuthFooter';
import './AuthScreens.css';

type OtpScreenProps = {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  isLoading?: boolean;
};

export function OtpScreen({ email, onVerify, onResend, isLoading }: OtpScreenProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onVerify(code);
    }
  };

  return (
    <>
      <div className="auth-screen">
        <h1 className="auth-title">{t('auth.otpTitle')}</h1>
        <p className="auth-subtitle">
          {t('auth.otpSubtitle')}<br />
          <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder={t('auth.otpPlaceholder')}
              className="auth-input auth-input-center"
              maxLength={6}
              disabled={isLoading}
              required
            />
          </div>
          
          <button type="submit" className="auth-button auth-button-primary" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('common.continue')}
          </button>

          <button 
            type="button"
            className="auth-button-text"
            onClick={onResend}
            disabled={isLoading}
          >
            {t('auth.resendCode')}
          </button>
        </form>
      </div>
      
      <AuthFooter />
    </>
  );
}
