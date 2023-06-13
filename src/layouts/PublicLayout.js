import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import Footer from 'components/footer/Footer';
import { useSelector } from 'react-redux';
import { AuthHealthCheck } from 'components/authentication/AuthCheck';
import Loading from 'components/common/Loading';

const PublicLayout = () => {
  const { hash, pathname } = useLocation();
  const {
    config: { isFluid, navbarPosition }
  } = useSelector(state => state);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isAuth } = AuthHealthCheck({ isHealthCheck: true, key: pathname });
  if (isAuth === 'Loading') return <Loading />;

  console.log(`Rendering Component >> PublicLayout : ${isAuth}`);
  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}
      <div className={classNames('content')}>
        <NavbarTop />
        {/*------ Main Routes ------*/}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;