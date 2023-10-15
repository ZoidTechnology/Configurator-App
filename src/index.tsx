import '@webscopeio/react-textarea-autocomplete/style.css';
import {createRoot} from 'react-dom/client';
import Root from './containers/Root';
import './app.global.css';
import {
  getThemeModeFromStore,
  getThemeNameFromStore,
} from './utils/device-store';
import {updateCSSVariables} from './utils/color-math';
import {THEMES} from './utils/themes';
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';

const {MODE} = import.meta.env;

Sentry.init({
  dsn: 'https://1083464e2a864de791972ab8c976849a@o4504817817747456.ingest.sentry.io/4504817834655749',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  normalizeDepth: 10,
  environment: MODE,
});

const elem = document.getElementById('root');
if (elem) {
  const root = createRoot(elem);
  root.render(<Root />);
  document.documentElement.dataset['themeMode'] = getThemeModeFromStore();
  updateCSSVariables(getThemeNameFromStore() as keyof typeof THEMES);
}
