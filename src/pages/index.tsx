import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import AppController from '../controllers/AppController';
import { PageEditor } from '../features/editor/DynamicEditor';
import { Plans } from '../interfaces/plans';
import { AuthInfoDTO, deserializeUserPlanDTO } from '../interfaces/user';
import { plansState } from '../state/atoms/plans';
import { userInfoState, userPlanState } from '../state/atoms/user';

interface Props {
  plans: Plans;
  authInfo: AuthInfoDTO | null;
}

export default function Home({ plans, authInfo }: Props) {
  return (
    <div className='h-screen flex flex-col overflow-hidden bg-gray-50'>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/images/favicon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#252f3f' />
        <meta
          name='description'
          content='Create edit image clips to share on social media.'
        />
        <meta
          name='og:title'
          content='editor.io | Turn your audio into sharable video'
        />
        <meta
          name='og:description'
          content='Create engaging videos for your podcast, music and audio clips to share on social media.'
        />
        <link rel='manifest' href='/manifest.json' />
        <title>Editor.io - Turn your audio into sharable video</title>
      </Head>

      <RecoilRoot
        initializeState={({ set }) => {
          set(plansState, plans);

          if (authInfo) {
            set(userInfoState, authInfo.user);

            if (authInfo.plan) {
              set(userPlanState, deserializeUserPlanDTO(authInfo.plan));
            }
          }
        }}
      >
        <AppController />
        <Toaster position='bottom-center' />
        <PageEditor />
      </RecoilRoot>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      plans: { free: { durationLimit: 100 } },
      authInfo: null,
    },
  };
}
