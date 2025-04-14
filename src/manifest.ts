import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/paidai-16.png',
    32: 'img/paidai-32.png',
    48: 'img/paidai-48.png',
    128: 'img/paidai-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/paidai-48.png',
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
      resources: [
        'img/paidai-16.png',
        'img/paidai-32.png',
        'img/paidai-48.png',
        'img/paidai-128.png',
        'img/paidai-disabled-16.png',
        'img/paidai-disabled-32.png',
        'img/paidai-disabled-48.png',
        'img/paidai-disabled-128.png',
      ],
      matches: [],
    },
  ],
  permissions: [
    'sidePanel',
    'storage',
    'activeTab',
    'scripting',
    'webRequest',
    'webRequestBlocking',
    '*://mp.weixin.qq.com/*',
  ],
  host_permissions: ['https://mp.weixin.qq.com/*'],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  },
})
