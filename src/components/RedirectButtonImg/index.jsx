import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RedirectButtonImg({ dataTest, iconImg, path, iconAlt }) {
  // const { push } = useHistory();
  console.log(path);
  return (
    // <Link to={ path }>
    //   <img data-testid={ dataTest } src={ iconImg } alt={ iconAlt } />
    // </Link>
    <div>oi</div>
    // <button
    //   type="button"
    //   onClick={ () => push(path) }
    // >
    //   <img data-testid={ dataTest } src={ iconImg } alt={ iconAlt } />
    // </button>
  );
}

RedirectButtonImg.propTypes = {
  dataTest: PropTypes.string,
  iconImg: PropTypes.string,
  path: PropTypes.string,
  iconAlt: PropTypes.string,
}.isRequired;
