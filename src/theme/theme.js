import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#093c59',
    },
    secondary: {
      main: '#226516',
    },
    background: {
      paper: '#fdfdfd',
      default: '#ffffff',
    },
    text: {
      primary: '#090909',
    },
    error: {
      main: '#bc1111',
    },
    success: {
      main: '#1d9129',
    },
    warning: {
      main: '#b86b11',
    },
    darkGray: {
      main: '#6f706e',
    },
    gray: {
      main: '#d2d2d2',
    },
    lightGray: {
      main: '#EAEAEA',
    },
  },
  typography: {
    fontFamily: ['Lato', 'Roboto', 'Open Sans', 'sans-serif'].join(','),
    h1: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: '2.0625rem',
    },
    h2: {
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: '1.5625rem',
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: '1.5625rem',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '1.25rem',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '1.875rem',
    },
    caption: {
      fontSize: '0.8125rem',
      lineHeight: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.text.primary,
          borderWidth: '1px !important',
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: `${theme.palette.primary.main}bf`,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: 'wrap',
        },
      },
    },
  },
  mixins: {
    cardExpanded: {
      fontWeight: 400,
      mb: '1rem',
      transition: 'margin 300ms ease',
    },
    cardCollapsed: {
      fontWeight: 400,
      WebkitLineClamp: '6',
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'margin 300ms ease',
    },
  },
});

export default theme;
