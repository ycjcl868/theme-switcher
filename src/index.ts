import { isBrowser } from './utils';

interface Config {
  themeMap: object;
  prefetchId?: string;
  id?: string;
  storageKey?: string;
  attr?: string;
}

interface SwitchConfig {
  theme: string;
  useStorage?: boolean;
}

interface Result {
  switcher: (config: SwitchConfig) => void,
  getTheme: () => string;
}

/**
 * const themeSwitcher = ThemeSwitcher({
 *   id: 'theme-style',
 *   storageKey: 'site-theme',
 * });
 *
 * @param config
 */
const themeSwitcher = (config: Config): Result => {
  const {
    id = 'theme-style',
    prefetchId = 'theme-prefetch',
    storageKey = 'site-theme',
    attr = 'data-theme',
    themeMap,
  } = config || {};

  if (!themeMap) {
    throw new Error('ThemeSwitcher need themeMap like: { dark: "/dark.css" }')
  }

  // support SSR
  if (!isBrowser) {
    // @ts-ignore
    return () => {};
  }

  // prefetch link css
  const themes = Object.keys(themeMap);
  themes.forEach(theme => {
    const themeAssetId = `${prefetchId}-${theme}`;
    if (!document.getElementById(themeAssetId)) {
      // add prefetch
      const stylePrefetch = document.createElement('link');
      stylePrefetch.rel = 'prefetch';
      stylePrefetch.type = 'text/css';
      stylePrefetch.id = themeAssetId;
      stylePrefetch.href = themeMap[theme];
      document.body.append(stylePrefetch);
    }
  })

  // TODO: use global
  const getTheme: () => string = () => localStorage.getItem(storageKey);

  const switcher: (config: SwitchConfig) => void = (switchConfig) => {
    const { theme, useStorage = true } = switchConfig;
    const dom = document.getElementById(id);
    if (dom) {
      dom.remove();
    }
    if (useStorage) {
      localStorage.removeItem(storageKey);
      localStorage.setItem(storageKey, theme);
    }
    if (themeMap[theme]) {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = id;
      style.href = themeMap[theme];
      document.body.append(style);
    }
    document.body.setAttribute(attr, theme);
  };

  return {
    switcher,
    getTheme,
  }
}

export default themeSwitcher;
