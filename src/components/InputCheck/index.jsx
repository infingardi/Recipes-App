import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateInProgress } from '../../hooks';
import handleData from '../../helper';
import { RemoveProgress, setInProgressRecipes } from '../../redux/actions';
import './index.css';

export default function InputCheck({ text, index }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const mealsOrDrinks = pathname.split('/')[1] === 'foods' ? 'meals' : 'drinks';

  const { name } = handleData()[mealsOrDrinks];
  const { inProgressRecipes } = useSelector((state) => state);
  const { addCheck, removeCheck } = useUpdateInProgress(name);
  const [isChecked, setIsChecked] = useState(
    inProgressRecipes[name][id].includes(text.trim()),
  );

  async function checkList({ target: { checked, parentElement } }) {
    const newCheck = { [id]: [...inProgressRecipes[name][id], parentElement.innerText] };
    setIsChecked((old) => !old);
    if (checked) {
      await addCheck(parentElement.innerText);
      dispatch(setInProgressRecipes(name, newCheck, id));
    } else {
      await removeCheck(parentElement.innerText);
      dispatch(RemoveProgress(name, { [id]: inProgressRecipes[name][id]
        .filter((f) => f !== parentElement.innerText) }));
    }
  }

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `${index}-ingredient-step` }
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
    </label>
  );
}

InputCheck.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
