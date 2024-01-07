import { useCallback } from 'react';

import useTemplateDispatcher from '../state/dispatchers/template';

function useTemplate() {
  const { setCurrentTemplateSaved } = useTemplateDispatcher();

  const downloadTemplate = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const template = await setCurrentTemplateSaved();
  }, [setCurrentTemplateSaved]);

  return {
    downloadTemplate,
  };
}

export default useTemplate;
