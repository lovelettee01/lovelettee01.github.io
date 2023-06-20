import { createContext } from 'react';
import { settings } from 'config';

const AppContext = createContext(settings);

export const PostContext = createContext({ posts: [] });

export const CompanyContext = createContext({
  companys: [],
  primaryCompanys: []
});

export default AppContext;
