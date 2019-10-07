import { useState } from 'react';

const useDropdown = (initialOptions, initialValue, initialSelected) => {
  const [options, setOptions] = useState(initialOptions);
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState(initialSelected);

  return {
    options,
    value,
    selected,
    setOptions: items => setOptions(items),
    setValue: val => setValue(val),
    setSelected: sel => setSelected(sel),
  };
};

export default useDropdown;
