import React from 'react';
import PropTypes from 'prop-types';
import { getColor } from 'helpers/utils';
import useToggleStyle from './hooks/useToggleStyle';
import { useSelector, useDispatch } from 'react-redux';

const Main = props => {
  const { isDark, isRTL } = useSelector(state => state.config);
  const dispatch = useDispatch();

  const { isLoaded } = useToggleStyle(isRTL, isDark, dispatch);
  if (!isLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: isDark ? getColor('dark') : getColor('light')
        }}
      />
    );
  }

  console.log(`Rendering Component >> MAIN`);
  return <>{props.children}</>;
};

Main.propTypes = { children: PropTypes.node };

export default Main;
