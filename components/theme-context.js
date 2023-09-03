import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  applyTheme: (value) => {},
  user: null,
  updateUser: (user) => {}
});