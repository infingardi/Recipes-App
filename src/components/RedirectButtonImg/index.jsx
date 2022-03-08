import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RedirectButtonImg({ dataTest, iconImg, path, iconAlt }) {
  const { push } = useHistory();
  return (
    <button
      type="button"
      data-testid={ dataTest }
      onClick={ () => push(path) }
      src={ iconImg }
    >
      <img src={ iconImg } alt={ iconAlt } />
    </button>
  );
}

RedirectButtonImg.propTypes = {
  dataTest: PropTypes.string,
  iconImg: PropTypes.string,
  path: PropTypes.string,
  iconAlt: PropTypes.string,
}.isRequired;
