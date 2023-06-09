import { createContext } from 'react';
import { settings } from 'config';

const AppContext = createContext(settings);

export const EmailContext = createContext({ emails: [] });

export const PostContext = createContext({ posts: [] });

export const CompanyContext = createContext({
  companys: [],
  primaryCompanys: []
});

export const AuthWizardContext = createContext({ user: {} });

export default AppContext;
