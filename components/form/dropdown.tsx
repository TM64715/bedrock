import { Listbox as HListbox } from '@headlessui/react';
import React from 'react';

interface ListboxItem {
  id: string;
  label: string;
  unavailable?: boolean;
}
interface ListboxProps {
  data: ListboxItem[];
  selected: ListboxItem;
  setSelected: (e: ListboxItem) => void;
}

function Listbox({ selected, setSelected, data }:ListboxProps) {
  return (
    <HListbox value={selected || data[0]} onChange={setSelected}>
      <HListbox.Button>{selected.label}</HListbox.Button>
      <HListbox.Options>
        {data.map((item) => (
          <HListbox.Option
            key={item.id}
            value={item}
            disabled={item.unavailable}
          >
            {item.label}
          </HListbox.Option>
        ))}
      </HListbox.Options>
    </HListbox>
  );
}

export default Listbox;
