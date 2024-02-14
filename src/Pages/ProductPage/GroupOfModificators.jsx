import React, { useCallback, useEffect, useState } from 'react'
import plus from "../../../src/assets/add.svg";
import classNames from 'classnames';


const getFactoredName = (name) => name.split(" ").slice(0, 2).join(" ");
const getDefaultValue = (group) => group.modifications.find(mod => mod.name.toLowerCase().includes("без"));


const GroupOfModificators = ({ group, handleModificatorChange }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  useEffect(() => {
    const defaultMod = getDefaultValue(group);
    setSelectedOption(defaultMod?.dish_modification_id);
  }, [group]);

  const handleSelect = useCallback((modificatorId) => {
    setSelectedOption(modificatorId);
    const modificator = group.modifications.find(mod => mod.dish_modification_id === modificatorId);
    handleModificatorChange({
      m: modificatorId,
      a: 1,
      price: modificator.price,
      group: group.dish_modification_group_id,
      name: modificator.name
    });
  }, [group.dish_modification_group_id, group.modifications, handleModificatorChange]);

  return (
    <React.Fragment>
      {group.modifications.map((modificator) => (
        <div
          key={modificator.dish_modification_id}
          onClick={() => handleSelect(modificator.dish_modification_id)}
          className={classNames("modificator", { selected: selectedOption === modificator.dish_modification_id })}
        >
          <img src={plus} alt="add the item to cart" />
          <b>{getFactoredName(modificator.name)}</b>
          {/*<span>{modificator.price}₴/{modificator.brutto}г</span>*/}
          {modificator.price !== 0 && <span>{modificator.price}₴/40г</span>}
        </div>
      ))}
    </React.Fragment>
  )
}

export default GroupOfModificators
