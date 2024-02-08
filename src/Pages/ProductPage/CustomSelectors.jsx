import React, { useEffect, useCallback, useRef, useState } from 'react'
import arr from "../../assets/arrowDropMod.svg"
import "./Modificators.scss"

const getFactoredName = (name) => name.split(" ").slice(0, 2).join(" ");

export const CustomSelectors = React.memo(({ group, onModificatorChange }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const dropdownRef = useRef(null);

  const selected = selectedOption ? getFactoredName(group.modifications.find(mod => mod.dish_modification_id === selectedOption)?.name) : 'Виберіть опцію'

  useEffect(() => {
    const defaultMod = group.modifications.find(mod => mod.name.toLowerCase().includes("без"));
    setSelectedOption(defaultMod?.dish_modification_id);

    // Обробник для кліку поза дропдауном
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [group.modifications]);

  const handleSelect = useCallback((modificatorId) => {
    setSelectedOption(modificatorId);
    const modificator = group.modifications.find(mod => mod.dish_modification_id === modificatorId);
    onModificatorChange({
      m: modificatorId,
      a: 1,
      price: modificator.price,
      group: group.dish_modification_group_id,
      name: modificator.name
    });
    setIsOpen(false);
  }, [group.dish_modification_group_id, group.modifications, onModificatorChange]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className='custom-select__toggle' onClick={toggleDropdown}>
        <p>{selected}</p>
        <img className={isOpen ? 'rotate' : ''} alt="dropdownArrow" src={arr} />

      </div>
      <div className={`custom-select__menu ${isOpen ? 'open' : ''}`}>
        {group.modifications.map((modificator) => (
          <div
            key={modificator.dish_modification_id}
            onClick={() => handleSelect(modificator.dish_modification_id)}
            className="custom-select__option"
          >
            {getFactoredName(modificator.name)}
          </div>
        ))}
      </div>

    </div>
  );
});


