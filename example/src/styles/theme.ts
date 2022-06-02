import {
  createGlobalStyles as createGlobalStylesFn,
  DefaultTheme,
} from 'solid-styled-components';
import Color from 'color';

export const createGlobalStyles = (theme: DefaultTheme) => createGlobalStylesFn`
  html, body, #root {
    font-family: 'Inter', --apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  }

  body {
    background: ${theme.colors.surface.toString()};
    color: ${theme.getOnColor('surface').toString()};
    min-height: 90vh;
  }
  * {
    color: inherit;
    font-family: inherit;
    box-sizing: border-box;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }
`;

const darkColors: DefaultTheme['colors'] = {
  primary: Color('blue'),
  onPrimary: Color('white'),
  surface: Color('black'),
  onSurface: Color('white'),
};

const lightColors: DefaultTheme['colors'] = {
  primary: Color('blue'),
  onPrimary: Color('white'),
  onSurface: Color('black'),
  surface: Color('white'),
};

const toFirstLetterUppercase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const createTheme = (isDark?: boolean): DefaultTheme => {
  const colors = isDark ? darkColors : lightColors;
  const mostReadable = (
    color: Color,
    colorList: [Color, Color] = [Color('white'), Color('black')],
  ) => (color.luminosity() > 0.5 ? colorList[0] : colorList[1]);
  const getOnColor: DefaultTheme['getOnColor'] = key => {
    const onKey = `on${toFirstLetterUppercase(key)}`;
    if (onKey in colors) {
      return colors[onKey as keyof DefaultTheme['colors']];
    }
    return mostReadable(colors[key]);
  };
  return {
    colors,
    mostReadable,
    getOnColor,
  };
};
