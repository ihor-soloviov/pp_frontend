import React, { useState } from "react";
import Popup from "../Popup/Popup";
import "./AddressModal.scss";
import hover from "../../../src/assets/radiobuttons/hover.svg";
import selected from "../../../src/assets/radiobuttons/selected.svg";

const AddressModal = ({ closeModal, isModalOpen }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  return (
    <>
      {isModalOpen && (
        <Popup closeModal={closeModal}>
          <div className="modal-content">
            <h2 className="modal-content--title">Додати адресу</h2>
            <form action="post" method="post">
              <div className="form address-form">
                <div className="form_item address-form__item">
                  Назва адреси
                  <label className="form_item--label">
                    <input type="text" placeholder="Назва адреси" />
                  </label>
                </div>

                <div className="address-form__half">
                  <div className="form_item address-form__item">
                    Вулиця
                    <label className="form_item--label">
                      <input type="text" placeholder="Вулиця" />
                    </label>
                  </div>

                  <div className="form_item address-form__item">
                    № Будинку
                    <label className="form_item--label">
                      <input type="text" placeholder="№ Будинку" />
                    </label>
                  </div>
                </div>
                <div className="address-form__half">
                  <label className="radio">
                    <div
                      className="radio-button"
                      onClick={() =>
                        handleOptionChange({ target: { value: "flat" } })
                      }
                    >
                      {selectedOption === "flat" ? (
                        <img src={selected} alt="flat" />
                      ) : (
                        <img src={hover} alt="house" />
                      )}
                    </div>
                    <p>Квартира</p>
                  </label>

                  <label className="radio">
                    <div
                      className="radio-button"
                      onClick={() =>
                        handleOptionChange({ target: { value: "house" } })
                      }
                    >
                      {selectedOption === "house" ? (
                        <img src={selected} alt="flat" />
                      ) : (
                        <img src={hover} alt="house" />
                      )}
                    </div>
                    <p>Приватний будинок</p>
                  </label>
                </div>
                {selectedOption === "flat" && (
                  <>
                    <div className="address-form__half">
                      <div className="form_item address-form__item">
                        Квартира
                        <label className="form_item--label">
                          <input type="text" placeholder="Квартира" />
                        </label>
                      </div>

                      <div className="form_item address-form__item">
                        Парадна
                        <label className="form_item--label">
                          <input type="text" placeholder="Парадна" />
                        </label>
                      </div>
                    </div>
                    <div className="address-form__half">
                      <div className="form_item address-form__item">
                        Код
                        <label className="form_item--label">
                          <input type="text" placeholder="Код" />
                        </label>
                      </div>

                      <div className="form_item address-form__item">
                        Поверх
                        <label className="form_item--label">
                          <input type="text" placeholder="Поверх" />
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <div className="form_item address-form__item">
                Коментар
                <label className="form_item--label">
                  <textarea placeholder='Можете тут написати будь-що:)' rows={1} />
                </label>
              </div>
              </div>
              <div className="form-button">
                <button className="btn-main " type="submit">
                  Зберегти зміни
                </button>
              </div>
            </form>
          </div>
        </Popup>
      )}
    </>
  );
};

export default AddressModal;
