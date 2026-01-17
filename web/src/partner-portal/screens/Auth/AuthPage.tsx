import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { OtpScreen } from './OtpScreen';
import { authService } from '../../../services/authService';
import { ApiError } from '../../../services/apiErrors';
import { authStorage } from '../../../utils/authStorage';
import { t } from '../../../i18n';
import './AuthScreens.css';

type AuthStep = 'login' | 'register' | 'otp';

export function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>('login');
  const [email, setEmail] = useState('');
  const [loginAccessCodeId, setLoginAccessCodeId] = useState('');
  const [googleToken, setGoogleToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthSuccess = (token: string, userId: string, userEmail: string, userFirstName: string, userLastName: string) => {
    authStorage.setToken(token);
    authStorage.setUserData({
      userId,
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
    });
    // Navigate to partner portal dashboard or home after login
    navigate('/partner');
  };

  const handleContinueWithEmail = async (emailValue: string) => {
    setEmail(emailValue);
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({
        email: emailValue,
        type: 'email',
      });

      if (response.isNewUser) {
        setStep('register');
      } else if (response.loginAccessCodeId) {
        setLoginAccessCodeId(response.loginAccessCodeId);
        setStep('otp');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t(`api.exceptionCodes.${err.message}`) || t('api.exceptionCodes.general'));
      } else {
        setError(t('api.exceptionCodes.general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('');
      setIsLoading(true);

      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info from Google');
        }

        const userInfo = await userInfoResponse.json();
        const googleEmail = userInfo.email;

        setEmail(googleEmail);
        setGoogleToken(tokenResponse.access_token);

        const response = await authService.login({
          email: googleEmail,
          type: 'google',
          token: tokenResponse.access_token,
        });

        if (response.isNewUser) {
          setStep('register');
        } else if (response.userDetail) {
          handleAuthSuccess(
            response.userDetail.token,
            response.userDetail.userId,
            response.userDetail.email,
            response.userDetail.firstName,
            response.userDetail.lastName
          );
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(t(`api.exceptionCodes.${err.message}`) || t('api.exceptionCodes.general'));
        } else {
          setError(t('api.exceptionCodes.general'));
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError(t('api.exceptionCodes.general'));
    },
  });

  const handleContinueWithGoogle = () => {
    googleLogin();
  };

  const handleRegisterComplete = async (firstNameValue: string, lastNameValue: string) => {
    setError('');
    setIsLoading(true);

    try {
      const isGoogleRegistration = !!googleToken;

      const response = await authService.register({
        email,
        firstName: firstNameValue,
        lastName: lastNameValue,
        type: isGoogleRegistration ? 'google' : 'email',
        token: isGoogleRegistration ? googleToken : undefined,
      });

      if (response.userDetail) {
        handleAuthSuccess(
          response.userDetail.token,
          response.userDetail.userId,
          response.userDetail.email,
          response.userDetail.firstName,
          response.userDetail.lastName
        );
      } else if (response.loginAccessCodeId) {
        setLoginAccessCodeId(response.loginAccessCodeId);
        setStep('otp');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t(`api.exceptionCodes.${err.message}`) || t('api.exceptionCodes.general'));
      } else {
        setError(t('api.exceptionCodes.general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (code: string) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.validateAccessCode({
        loginAccessCodeId,
        accessCode: code,
      });

      handleAuthSuccess(
        response.userDetail.token,
        response.userDetail.userId,
        response.userDetail.email,
        response.userDetail.firstName,
        response.userDetail.lastName
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t(`api.exceptionCodes.${err.message}`) || t('api.exceptionCodes.general'));
      } else {
        setError(t('api.exceptionCodes.general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({
        email,
        type: 'email',
      });

      if (response.loginAccessCodeId) {
        setLoginAccessCodeId(response.loginAccessCodeId);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t(`api.exceptionCodes.${err.message}`) || t('api.exceptionCodes.general'));
      } else {
        setError(t('api.exceptionCodes.general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {error && <div className="auth-error">{error}</div>}

        {step === 'login' && (
          <LoginScreen
            onContinueWithEmail={handleContinueWithEmail}
            onContinueWithGoogle={handleContinueWithGoogle}
            isLoading={isLoading}
          />
        )}
        
        {step === 'register' && (
          <RegisterScreen
            email={email}
            onComplete={handleRegisterComplete}
            isLoading={isLoading}
            isGoogleRegistration={!!googleToken}
          />
        )}
        
        {step === 'otp' && (
          <OtpScreen
            email={email}
            onVerify={handleOtpVerify}
            onResend={handleResendOtp}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
