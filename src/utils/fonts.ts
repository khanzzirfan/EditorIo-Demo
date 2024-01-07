/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import type { Config } from 'webfontloader';

export async function loadFonts(families: string[], config?: Config) {
  await new Promise<void>(async (resolve, reject) => {
    if (!process.browser) {
      resolve();
    }

    const WebFont = await import('webfontloader');

    try {
      WebFont.load({
        google: {
          families,
        },
        active: resolve,
        fontinactive: (family: any) => {
          console.log('failed to load font', family);
        },
        ...config,
      });
    } catch (e) {
      reject(e);
    }
  });
}
