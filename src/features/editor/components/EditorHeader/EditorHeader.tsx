import React, { useState } from 'react';

import LoginModal from '../LoginModal';

function EditorHeader() {
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <div className='flex bg-white border-b w-full py-2 items-center'>
      <LoginModal close={() => setLoginVisible(false)} visible={loginVisible} />

      <div className='flex w-full items-center'>
        <div className='flex items-center space-x-2 px-2 w-72'>
          {/* <OpenTemplateButton />
          <SaveTemplateButton />
          <VideosButton /> */}
        </div>

        {/* <AudioControls /> */}

        {/* <div className="flex items-center space-x-2 px-2">
          <ExportButton />
          {ENABLE_UPGRADES && (
            <Button
              onClick={handleClickUpgrade}
              type="custom"
              icon={SparklesIcon}
              className="py-2 px-4 rounded-md font-semibold bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 transition duration-150 border border-transparent text-yellow-600 focus:text-yellow-700 hover:text-yellow-700 focus:ring-yellow-300 focus:outline-none focus:ring-2"
            >
              {isPro ? "Professional" : "Upgrade"}
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default EditorHeader;
