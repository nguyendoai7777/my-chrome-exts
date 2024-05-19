import { defineManifest } from '@crxjs/vite-plugin';
import packageData from '../package.json';

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development';

const img = (size: number) => `images/${size}.png`;
const icon = (size: number) => `icons/icon${size}.png`;

export default defineManifest({
  name: packageData.displayName,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: icon(16),
    32: icon(32),
    48: icon(48),
    128: icon(128),
  },
  action: {
    default_popup: 'popup.html',
    default_icon: icon(48),
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: [icon(16), icon(32), icon(48), icon(128)],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage'],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  },
});
