// import original module declarations
import 'solid-styled-components';
import Color from 'color';

// and extend them!
declare module 'solid-styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: Color;
      surface: Color;
      onSurface: Color;
      onPrimary: Color;
    };
    getOnColor: (color: keyof DefaultTheme['colors']) => Color;
    mostReadable: (color: Color, colorList?: [Color, Color]) => Color;
  }
}
