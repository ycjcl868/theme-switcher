import themeSwitcher from '../';

describe('switcher', () => {
  const html = document.documentElement.innerHTML;
  const resetDocument = () => {
    document.documentElement.innerHTML = html;
  }

  afterEach(() => {
    // reset html
    resetDocument();
  })

  it('normal', () => {
    expect(document.querySelectorAll('link[rel="prefetch"][id="theme-prefetch"]').length).toEqual(0);
    const { switcher, getTheme } = themeSwitcher({
      themeMap: {
        dark: '/dark.css',
        light: '/default.css',
      }
    });
    expect(document.querySelectorAll('link[rel="prefetch"]').length).toEqual(2);
    resetDocument();
    switcher({
      theme: 'dark',
    })
    expect(document.querySelector('link[href="/dark.css"][id="theme-style"]')).toBeTruthy();
    expect(document.querySelector('link[href="/default.css"][id="theme-style"]')).toBeFalsy();
    expect(document.body.getAttribute('data-theme')).toEqual(getTheme());
  });

  it('normal use CustomId', () => {
    expect(document.querySelectorAll('link[rel="prefetch"]').length).toEqual(0);
    const { switcher, getTheme } = themeSwitcher({
      id: 'custom-id',
      themeMap: {
        dark: '/dark.css',
        light: '/default.css',
      },
      prefetchId: 'custom-prefetch-id',
    });
    expect(document.querySelectorAll('link[rel="prefetch"]').length).toEqual(2);
    expect(document.querySelectorAll('link[rel="prefetch"][id="custom-prefetch-id-dark"]')).toBeTruthy();
    expect(document.querySelectorAll('link[rel="prefetch"][id="custom-prefetch-id-light"]')).toBeTruthy();

    resetDocument();
    switcher({
      theme: 'light',
    });

    expect(document.querySelector('link[href="/default.css"][id="custom-id"]')).toBeTruthy();
    expect(document.querySelector('link[href="/dark.css"][id="custom-id"]')).toBeFalsy();
    expect(document.body.getAttribute('data-theme')).toEqual(getTheme());
  });
})
