import React from 'react';

export const DefaultContext = React.createContext({
	theme: 'light',
	applyTheme: (value) => {},
	user: null,
	updateUser: (user) => {}
});