import React, { useMemo } from 'react'

const getFactoredName = (name) => name.split(" ").slice(0, 2).join(" ");

export const CustomSelectors = React.memo(({ group, onModificatorChange }) => {

  const defaultValue = useMemo(() => group.modifications.find(obj => obj.name.toLowerCase().includes("без"))?.dish_modification_id, [group.modifications]);

  const handleChange = (event) => {
    const modificatorId = +event.target.value;
    const selectedMod = group.modifications.find(mod => mod.dish_modification_id === modificatorId);
    if (selectedMod) {
      onModificatorChange({
        m: selectedMod.dish_modification_id,
        a: 1,
        price: selectedMod.price,
        group: group.dish_modification_group_id,
        name: selectedMod.name
      });
    }
  };

  return (
    <select onChange={handleChange} defaultValue={defaultValue}>
      {group.modifications.map(modificator => (
        <option key={modificator.dish_modification_id} value={modificator.dish_modification_id}>
          {getFactoredName(modificator.name)}
        </option>
      ))}
    </select>
  );
});


