//Import React
import { useState, useRef, useEffect } from 'react';

//Import Styles

const InputCode = ({ onData }) => {
  const [code, setCode] = useState('');
  const inputRefs = useRef([]);
  useEffect(() => {
    if (code.length === 6) {
      onData(code);
    }
  }, [code]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const nextIndex = index + 1;

    // Сохраняем значение инпута в состояние и переходим к следующему инпуту
    setCode((prevCode) => {
      const codeArray = prevCode.split('');
      codeArray[index] = value;
      if (value && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return codeArray.join('');
    });
  };

  const handleInputKeyDown = (event, index) => {
    const prevIndex = index - 1;
    const nextIndex = index + 1;

    // Перемещаем фокус на предыдущий или следующий инпут при нажатии на Backspace или Delete
    if (event.key === 'Backspace' && prevIndex >= 0) {
      inputRefs.current[prevIndex].focus();
    } else if (event.key === 'Delete' && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div className='inputCode'>
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type='text'
          value={code[index] || ''}
          maxLength={1}
          className='inputCode__item'
          onChange={(event) => handleInputChange(event, index)}
          onKeyDown={(event) => handleInputKeyDown(event, index)}
        />
      ))}
    </div>
  );
};

export default InputCode;
