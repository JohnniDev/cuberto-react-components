import { useState, useCallback } from 'react';

const useDropdown = (initialOptions, initialValue, initialSelected) => {
  const [options, setOptions] = useState(initialOptions);
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState(initialSelected);

  return {
    options,
    value,
    selected,
    setOptions: useCallback(items => setOptions(items)),
    setValue: useCallback(val => setValue(val)),
    setSelected: useCallback(sel => setSelected(sel)),
  };
};

export default useDropdown;
