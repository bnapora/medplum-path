import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { RegisterForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
// import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID, MEDPLUM_RECAPTCHA_SITE_KEY } from '../config';
import { getConfig, isRegisterEnabled } from '../config';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const config = getConfig();

  return (
    <SimpleGrid cols={2}>
      <Box pt={100} pb={200}>
        <RegisterForm
          type="patient"
          projectId={config.projectId}
          googleClientId={config.googleClientId}
          recaptchaSiteKey={config.recaptchaSiteKey}
          onSuccess={() => navigate('/')}
        >
          <h2>Register with Gestalt PathCloud</h2>
        </RegisterForm>
      </Box>
      <BackgroundImage src="../../src/img/landingPage/gestalt++digital+pathology+background-2273w.png" />
    </SimpleGrid>
  );
}
