import React, { useCallback, useEffect, useState } from 'react';
import plus from '../../assets/add.svg';
import added from '../../assets/added.svg';
import classNames from 'classnames';
import { handleModificatorChange } from '../../utils/menu';

// const getFactoredName = (name) => name.split(' ').slice(0, 2).join(' ');
const getDefaultValue = (group) =>
  group.modifications.find((mod) => mod.name.toLowerCase().includes('без'));

const GroupOfModificators = ({ group, setSelectedModificators }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  useEffect(() => {
    const defaultMod = getDefaultValue(group);
    setSelectedOption(defaultMod?.dish_modification_id);
  }, [group]);

  const handleSelect = useCallback(
    (modificatorId) => {
      setSelectedOption(modificatorId);
      const modificator = group.modifications.find(
        (mod) => mod.dish_modification_id === modificatorId,
      );
      handleModificatorChange(
        {
          m: modificatorId,
          a: 1,
          price: modificator.price,
          group: group.dish_modification_group_id,
          name: modificator.name,
        },
        setSelectedModificators,
      );
    },
    [group.dish_modification_group_id, group.modifications, setSelectedModificators],
  );

  return (
    <React.Fragment>
      {group.modifications.map((modificator, index) => (
        <div
          key={modificator.dish_modification_id}
          onClick={() => handleSelect(modificator.dish_modification_id)}
          className={classNames('modificator', {
            selected: selectedOption === modificator.dish_modification_id,
          })}
        >
          <img
            src={selectedOption === modificator.dish_modification_id ? added : plus}
            alt='add the item to cart'
          />
          <b>{modificator.name}</b>
          <span>{modificator.price === 0 ? '' : `${modificator.price}₴`}</span>
        </div>
      ))}
    </React.Fragment>
  );
};

export default GroupOfModificators;
