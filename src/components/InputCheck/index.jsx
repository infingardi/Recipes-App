import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateInProgress } from '../../hooks';
import { RemoveProgress, setInProgressRecipes } from '../../redux/actions';
import './index.css';

export default function InputCheck({ text, index }) {
  const { id } = useParams();
  const { addCheck, removeCheck, storage } = useUpdateInProgress('meals');
  const [isChecked, setIsChecked] = useState(storage.meals[id].includes(text));
  const { inProgressRecipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  function checkList({ target: { checked, parentElement } }) {
    const newCheck = { [id]: [...inProgressRecipes.meals[id], parentElement.innerText] };
    setIsChecked((old) => !old);
    if (checked) {
      addCheck(parentElement.innerText);
      dispatch(setInProgressRecipes('meals', newCheck));
    } else {
      removeCheck(parentElement.innerText);
      dispatch(RemoveProgress('meals', { [id]: inProgressRecipes.meals[id]
        .filter((f) => f !== parentElement.innerText) }));
    }
  }

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `${index}-ingredient-step` }
      // className={ isChecked ? 'line' : null }
      style={
        isChecked ? { textDecoration: 'line-through' } : { textDecoration: 'none' }
      }
    >
      <input
        id={ `${index}-ingredient-step` }
        type="checkbox"
        onChange={ checkList }
        checked={ isChecked }
      />
      {text}
      {/* <span>
      </span> */}
    </label>
  );
}

InputCheck.propTypes = {
  text: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
