import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'src/redux/store';
import { resetAppAction } from 'src/redux/store/rootReducer';
import { JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { encryptStorage } from 'src/utils/secureStorage';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  platform: 'JWT';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type Action = InitializeAction | LoginAction | LogoutAction;

const userData = {
  id: '96d2d385375e86809283e28b',
  email: 'admin@exmaple.com',
  firstName: 'Yurii',
  lastName: 'Lubynets',
  password: 'test-password',
};

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          // const user = await authApi.me(accessToken);
          const user = userData;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // const accessToken = await authApi.login({ email, password });
    const accessToken = sign({ userId: userData.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // const user = await authApi.me(accessToken);
    const user = userData;

    localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'LOGIN',
      payload: { user },
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    encryptStorage.removeItem('accessToken');
    encryptStorage.removeItem('refreshToken');
    dispatchRedux(resetAppAction());
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
