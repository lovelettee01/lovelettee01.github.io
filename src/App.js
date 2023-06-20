import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import is from 'is_js';
import WebsiteRoutes from 'routes';

import { useSelector } from 'react-redux';

//React-datepicker 설정
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/';
registerLocale('ko', ko);
setDefaultLocale('ko');

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const { navbarPosition } = useSelector(state => state.config);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  console.log(`Rendering Component >> APP`);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <WebsiteRoutes />
      <SettingsToggle isDisabled={false} />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Router>
  );
};

export default App;
