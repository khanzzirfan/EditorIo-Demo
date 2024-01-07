import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';

import firebase_app from '../firebaseConfig';
import useUserDispatcher from '../state/dispatchers/user';
import { fetchAuthInfo } from '../utils/api/auth';

interface Params {
  bindAuthListener?: boolean;
}

function useAuth({ bindAuthListener = false }: Params = {}) {
  const { setUserAuthenticated, setUserUnauthenticated } = useUserDispatcher();

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  }, []);

  const signOut = useCallback(() => getAuth().signOut(), []);

  const authChangeCallback = useCallback(
    async (user: User | null) => {
      if (!user) {
        cookies.remove('userToken');
        setUserUnauthenticated();
        return;
      }

      const token = await user.getIdToken();
      cookies.set('userToken', token, { expires: 14 });
      const authInfo = await fetchAuthInfo(token);
      setUserAuthenticated(authInfo);
    },
    [setUserAuthenticated, setUserUnauthenticated],
  );

  useEffect(() => {
    if (bindAuthListener) {
      const auth = getAuth(firebase_app);
      console.log(auth);
      return getAuth().onAuthStateChanged(authChangeCallback);
    }
    return () => {};
  }, [authChangeCallback, bindAuthListener]);

  return {
    signIn,
    signOut,
  };
}

export default useAuth;
