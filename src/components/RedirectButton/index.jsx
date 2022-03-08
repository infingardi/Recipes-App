import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RedirectButton({ dataTest, titleBtn, path }) {
  const { push } = useHistory();
  return (
    <button
      type="button"
      data-testid={ dataTest }
      onClick={ () => push(path) }
    >
      { titleBtn }
    </button>
  );
}

RedirectButton.propTypes = {
  dataTest: PropTypes.string,
  titleBtn: PropTypes.string,
  path: PropTypes.string,
}.isRequired;
