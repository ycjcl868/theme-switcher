# Theme Switcher

[![codecov](https://codecov.io/gh/ycjcl868/theme-switcher/branch/master/graph/badge.svg)](https://codecov.io/gh/ycjcl868/theme-switcher) [![CircleCI](https://circleci.com/gh/ycjcl868/theme-switcher/tree/master.svg?style=svg)](https://circleci.com/gh/ycjcl868/theme-switcher/tree/master)

## Usage

Browser

```html
<script src="/dist/index.min.js"></script>
<script>
var themeSwitcher = window.ThemeSwitcher({
  themeMap: {
    dark: '/dark.css',
    default: '/default.css',
  }
});

// => will load <link rel="prefetch" href="dark.css" />
// => will load <link rel="prefetch" href="default.css" />

themeSwitcher.switcher({
  theme: 'dark',
});
// => will load <link rel="stylesheet" href="dark.css">

console.log(themeSwitcher.getTheme()); // => dark
</script>
```

ES Module

```js
import themeSwitcher from 'theme-switcher';

const { switcher, getTheme } = themeSwitcher({
  themeMap: {
    dark: '/dark.css',
    light: '/default.css',
  }
});

// => will load <link rel="prefetch" href="dark.css" />
// => will load <link rel="prefetch" href="default.css" />

themeSwitcher.switcher({
  theme: 'dark',
});
// => will load <link rel="stylesheet" href="dark.css">

console.log(themeSwitcher.getTheme()); // => dark
```
