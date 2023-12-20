import { DevtoolsProvider, DevtoolsPanel } from '@refinedev/devtools';
import { AppShell, ErrorBoundary, Loading, Logo, useMedplum, useMedplumProfile } from '@medplum/react';
import { IconUser } from '@tabler/icons-react';
import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Refine } from '@refinedev/core';
import { MantineInferencer } from '@refinedev/inferencer/mantine';
import dataProvider from '@refinedev/simple-rest';
import routerBindings, { NavigateToResource } from '@refinedev/react-router-v6';
import { HomePage, LandingPage, PatientPage, ResourcePage, SignInPage } from './pages';
import { PatientOverview, Timeline, PatientHistory } from './components';
import { UserList, UserEdit, WsiList } from './pages';
import { PostList } from './pages';

const REFINE_API_URL = 'https://api.fake-rest.refine.dev';
const TP4_FILE_EXPLORER_API_URL = 'https://viewer-tp-pathflow-poc.gestaltdiagnostics.com/latest/file-explorer';

export function App(): JSX.Element | null {
  const medplum = useMedplum();
  const location = useLocation();
  const profile = useMedplumProfile();

  if (medplum.isLoading()) {
    return null;
  }

  return (
      <Refine
        routerProvider={routerBindings}
        dataProvider={{
          default: dataProvider(REFINE_API_URL),
          tp4_file_explorer: dataProvider(TP4_FILE_EXPLORER_API_URL),
        }}
        resources={[
          {
            name: 'users',
            list: '/users',
            show: '/users/show/:id',
            create: '/users/create',
            edit: '/users/edit/:id',
          },
          {
            name: 'products',
            list: '/products',
            show: '/products/show/:id',
            create: '/products/create',
            edit: '/products/edit/:id',
          },
          {
            name: 'posts',
            list: '/posts',
            meta: {
              dataProviderName: 'default',
              label: 'Posts',
            },
          },
          {
            name: 'get_path_relative',
            list: '/get_path_relative',
            meta: {
              dataProviderName: 'tp4_file_explorer',
              label: 'WSI',
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: "fgxuYX-LLjb9a-UHkWW0"
        }}
      >
        <AppShell
          logo={<Logo size={24} />}
          menus={[
            {
              title: 'My Links',
              links: [
                { icon: <IconUser />, label: 'Patients', href: '/' },
                { icon: <IconUser />, label: 'Users', href: '/users' },
                { icon: <IconUser />, label: 'Products', href: '/products' },
                { icon: <IconUser />, label: 'WSI', href: '/get_path_relative' },
                { icon: <IconUser />, label: 'Posts', href: '/posts' },
              ],
            },
          ]}
          displayAddBookmark={true}
        >
          <ErrorBoundary key={location.key}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={profile ? <HomePage /> : <LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/Patient/:id" element={<PatientPage />}>
                  <Route index element={<PatientOverview />} />
                  <Route path="overview" element={<PatientOverview />} />
                  <Route path="timeline" element={<Timeline />} />
                  <Route path="history" element={<PatientHistory />} />
                </Route>
                <Route path="/:resourceType/:id" element={<ResourcePage />} />
                <Route path="/:resourceType/:id/_history/:versionId" element={<ResourcePage />} />
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="show/:id" element={<MantineInferencer />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="create" element={<MantineInferencer />} />
                </Route>
                <Route path="products">
                  <Route index element={<MantineInferencer />} />
                  <Route path="show/:id" element={<MantineInferencer />} />
                  <Route path="edit/:id" element={<MantineInferencer />} />
                  <Route path="create" element={<MantineInferencer />} />
                </Route>
                <Route path="get_path_relative">
                  <Route
                    index
                    element={<WsiList />}
                    // element={<MantineInferencer />}
                  />
                </Route>
                <Route path="posts">
                  <Route index element={<PostList />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </AppShell>
      </Refine>
  );
}
