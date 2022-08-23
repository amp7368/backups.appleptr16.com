import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeOptions } from '@mui/material';

export const defaultThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#7154d9',
        },
        secondary: {
            main: '#d9b354',
        },
        background: {
            default: '#232323',
            paper: '#623492',
        },
        text: {
            primary: '#cc174a',
            secondary: '#649c3a',
        },
        divider: '#649c3a',
        grey: { 500: '#333333' },
    },
};
export const defaultTheme = createTheme(defaultThemeOptions);

const element = document.getElementById('root');
const color = defaultTheme.palette.background.default;
if (element != null) element.style.backgroundColor = color;
