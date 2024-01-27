// // Default values work on localhost:3000 and foomedical.com
// // Replace these values with your own values for production
// export const MEDPLUM_PROJECT_ID = '9602358d-eeb0-4de8-bccf-e2438b5c9162';
// export const MEDPLUM_GOOGLE_CLIENT_ID = '679052511930-8dqur4mmg8egbttgos5pmr4ljtf3etbb.apps.googleusercontent.com';
// export const MEDPLUM_RECAPTCHA_SITE_KEY = '6LfFd_8gAAAAAOCVrZQ_aF2CN5b7s91NEYIu5GxL';

// Local Medplum Configs
export const MEDPLUM_PATIENT_ID = 'd8cde688-3bb8-462c-89d0-7ed7744a5bf7'

export interface MedplumAppConfig {
  baseUrl?: string;
  clientId?: string;
  projectId?: string;
  googleClientId?: string;
  recaptchaSiteKey?: string;
  registerEnabled?: boolean | string;
}

const config: MedplumAppConfig = {
  baseUrl: import.meta.env?.MEDPLUM_BASE_URL,
  clientId: import.meta.env?.MEDPLUM_CLIENT_ID,
  projectId: import.meta.env?.MEDPLUM_PROJECT_ID,
  googleClientId: import.meta.env?.GOOGLE_CLIENT_ID,
  recaptchaSiteKey: import.meta.env?.RECAPTCHA_SITE_KEY,
  registerEnabled: import.meta.env?.MEDPLUM_REGISTER_ENABLED,
};

export function getConfig(): MedplumAppConfig {
  return config;
}

export function isRegisterEnabled(): boolean {
  // Default to true
  return config.registerEnabled !== false && config.registerEnabled !== 'false';
}
