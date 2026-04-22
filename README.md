<p align="center">
<img src="./examples/public/marqy-logo.svg" align="center" height="40" />
</p>

<p align="center">
  <strong>High-fidelity loops for modern interfaces</strong><br />
  under 1kB gzipped // synchronized speeds // CSS-based animations
</p>

[![npm](https://img.shields.io/npm/v/marqy?style=flat&colorA=000000&colorB=000000
)](https://www.npmjs.com/package/marqy)
[![downloads](https://img.shields.io/npm/dm/marqy?style=flat&colorA=000000&colorB=000000
)](https://www.npmjs.com/package/marqy)
[![size](https://img.shields.io/bundlephobia/minzip/marqy?style=flat&label=size&colorA=000000&colorB=000000)](https://bundlephobia.com/package/marqy)

# DEMO: [MARQY.PARTY](https://marqy.party)

## Install

```sh
yarn add marqy
```

or using npm

```sh
npm i marqy
```

## Usage

#### Import React
```tsx
import { Marqy } from 'marqy';

<Marqy speed={1} direction="left" pauseOnHover>
  <span>Your content here</span>
</Marqy>
```

#### Import CSS
```js
import 'marqy/dist/marqy.css';
```
**or add it manually:** [see marqy.css stylesheet](./marqy.css)

### Properties

| Name           | Type                            | Description                               |
| -------------- | ------------------------------- | ----------------------------------------- |
| `speed`        | number **[default: 0.5]**       | Scroll speed multiplier                   |
| `direction`    | string **[default: 'left']**    | Direction of scroll                       |
| `pauseOnHover` | boolean **[default: false]**    | Pauses the animation on hover             |
| `manual`       | boolean **[default: false]**    | Renders without applying CSS animations   |
| `children`     | React.ReactNode                 | Content to repeat inside the marqy        |

### License

MIT © [Nick DiMatteo](https://www.nickdimatteo.com) + [Mike Wagz](https://www.mikewagz.com)