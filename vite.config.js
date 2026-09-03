import { sites } from '@openai/sites-vite-plugin';
import { defineConfig } from 'vite';

const localFileStyles = /<!-- local-file-styles:start -->[\s\S]*?<!-- local-file-styles:end -->/;
const localFileScripts = /<!-- local-file-scripts:start -->[\s\S]*?<!-- local-file-scripts:end -->/;

function sitesEntry() {
  return {
    name: 'sites-entry',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(localFileStyles, '')
          .replace(localFileScripts, '<script type="module" src="/site-entry.js"></script>');
      },
    },
  };
}

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    publicDir: 'public',
    plugins: [
      sitesEntry(),
      sites(),
      cloudflare({
        config: {
          name: 'server',
          main: './worker/index.js',
          compatibility_date: '2026-09-01',
          compatibility_flags: ['nodejs_compat'],
        },
      }),
    ],
  };
});
