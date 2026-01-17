import { useState } from 'react';
import { t } from '../../../i18n';
import { AuthFooter } from './components/AuthFooter';
import './AuthScreens.css';

type RegisterScreenProps = {
  email: string;
  onComplete: (firstName: string, lastName: string) => void;
  isLoading?: boolean;
  isGoogleRegistration?: boolean;
};

export function RegisterScreen({ email, onComplete, isLoading }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      onComplete(firstName, lastName);
    }
  };

  return (
    <>
      <div className="auth-screen">
        <h1 className="auth-title">{t('auth.registerTitle')}</h1>
        <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              value={email}
              disabled
              className="auth-input auth-input-disabled"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('auth.firstName')}
              className="auth-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t('auth.lastName')}
              className="auth-input"
              disabled={isLoading}
              required
            />
          </div>
          
          <button type="submit" className="auth-button auth-button-primary" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('common.continue')}
          </button>
        </form>
      </div>
      
      <AuthFooter />
    </>
  );
}
