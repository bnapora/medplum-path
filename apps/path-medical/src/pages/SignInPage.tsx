import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { SignInForm, useMedplumProfile } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import PathologistProfessionals1 from '../../src/img/landingPage/Pathologist-Professional-2273w.png'
// import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';
import { getConfig, isRegisterEnabled } from '../config';

export function SignInPage(): JSX.Element {
  const profile = useMedplumProfile();
  const navigate = useNavigate();
  const config = getConfig();
  return (
    <SimpleGrid cols={2}>
      <Box pt={100} pb={200}>
        <SignInForm
          projectId={config.projectId}
          googleClientId={config.googleClientId}
          onSuccess={() => navigate('/')}
          onRegister={isRegisterEnabled() ? () => navigate('/register') : undefined}
        >
          <h2>Sign in to Gestalt PathCloud</h2>
        </SignInForm>
      </Box>
      <BackgroundImage src="../../src/img/landingPage/laboratories+and+testing-1920w.jpg" />
    </SimpleGrid>
  );
}
