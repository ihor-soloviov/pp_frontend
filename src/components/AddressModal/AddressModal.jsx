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
              <div className="modal-grid">
                <div class="modal-grid--item-0 grid-item">
                  <p className="grid-item__text">Назва адреси</p>
                  <label className="form_item--label">
                    <input type="text" placeholder="Назва адреси" />
                  </label>
                </div>
                <div class="modal-grid--item-1 grid-item">
                  <p className="grid-item__text">Вулиця</p>
                  <label className="form_item--label">
                    <input type="text" placeholder="Вулиця" />
                  </label>
                </div>
                <div class="modal-grid--item-2 grid-item">
                  <p className="grid-item__text">№ Будинку</p>
                  <label className="form_item--label">
                    <input type="text" placeholder="№ Будинку" />
                  </label>
                </div>
                <div class="modal-grid--item-3 grid-item grid-radio">
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
                </div>
                <div class="modal-grid--item-4 grid-item grid-radio">
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
                  <div className="modal-grid--item-5 flat-grid">
                    <div class="flat-grid--item-0 grid-item">
                      <p className="grid-item__text">Квартира</p>
                      <label className="form_item--label">
                        <input type="text" placeholder="Квартира" />
                      </label>
                    </div>
                    <div class="flat-grid--item-1 grid-item">
                      <p className="grid-item__text">Парадна</p>
                      <label className="form_item--label">
                        <input type="text" placeholder="Парадна" />
                      </label>
                    </div>
                    <div class="flat-grid--item-2 grid-item">
                      <p className="grid-item__text">Код</p>
                      <label className="form_item--label">
                        <input type="text" placeholder="Код" />
                      </label>
                    </div>
                    <div class="flat-grid--item-3 grid-item">
                      <p className="grid-item__text">Поверх</p>
                      <label className="form_item--label">
                        <input type="text" placeholder="Поверх" />
                      </label>
                    </div>
                  </div>
                )}
                <div class="modal-grid--item-9 grid-item">
                  <p className="grid-item__text">Коментар</p>
                  <label className="form_item--label">
                    <textarea
                      placeholder="Можете тут написати будь-що:)"
                      rows={1}
                    />
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
