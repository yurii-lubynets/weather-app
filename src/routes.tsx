import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import LoadingScreen from 'src/components/LoadingScreen';
import MainLayout from 'src/components/MainLayout';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
);

const Login = Loadable(lazy(() => import('src/pages/authentication/Login')));
const Home = Loadable(lazy(() => import('src/pages/Home')));
const NotFound = Loadable(lazy(() => import('src/pages/NotFound')));
const Stations = Loadable(lazy(() => import('src/pages/Stations')));

const routes: Array<RouteObject> = [
  {
    path: '*',
    children: [
      {
        path: '',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'stations',
        element: <Stations />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
