import { useRecoilCallback } from 'recoil';

import { userInfoState, userPlanState } from '../atoms/user';
import { AuthInfoDTO, deserializeUserPlanDTO } from '../../interfaces/user';

function useUserDispatcher() {
  const setUserAuthenticated = useRecoilCallback(
    ({ set, reset }) => (authInfo: AuthInfoDTO) => {
      set(userInfoState, authInfo.user);
      if (authInfo.plan) {
        set(userPlanState, deserializeUserPlanDTO(authInfo.plan));
      } else {
        reset(userPlanState);
      }
    },
    []
  );
  const setUserUnauthenticated = useRecoilCallback(
    ({ reset }) => () => {
      reset(userInfoState);
      reset(userPlanState);
    },
    []
  );

  return {
    setUserAuthenticated,
    setUserUnauthenticated,
  };
}

export default useUserDispatcher;
