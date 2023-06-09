import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "../Popup/Popup";
import "./AddressModal.scss";
import hover from "../../../src/assets/radiobuttons/hover.svg";
import selected from "../../../src/assets/radiobuttons/selected.svg";
import { useSelector } from "react-redux";
import axios from "axios";

const AddressModal = ({ closeModal, isModalOpen, createAddress }) => {
  const userData = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (e, data) => {
    e.preventDefault();

    const JSONdata = JSON.stringify({ token: userData.token, data });

    axios
      .post("https://polarpelmeni-api.work-set.eu/api/addresses", JSONdata, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    createAddress(data);
    reset();
    setSelectedOption("");
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <Popup closeModal={closeModal}>
          <div className="modal-content">
            <h2 className="modal-content--title">Додати адресу</h2>
            <form action="post" method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-grid">
                <div className="modal-grid--item-0 grid-item">
                  <p className="grid-item__text">Назва адреси</p>
                  <label className="form_item--label">
                    <input
                      type="text"
                      placeholder="Назва адреси"
                      {...register("addressName", {
                        required: true,
                      })}
                    />
                  </label>
                  {errors?.address && <p>Error!</p>}
                </div>
                <div className="modal-grid--item-1 grid-item">
                  <p className="grid-item__text">Вулиця</p>
                  <label className="form_item--label">
                    <input
                      type="text"
                      placeholder="Вулиця"
                      {...register("streetName", {
                        required: true,
                        pattern: /^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s]*$/,
                      })}
                    />
                  </label>
                  <div height={40}>{errors?.street && <p>Error!</p>}</div>
                </div>
                <div className="modal-grid--item-2 grid-item">
                  <p className="grid-item__text">№ Будинку</p>
                  <label className="form_item--label">
                    <input
                      type="text"
                      placeholder="№ Будинку"
                      {...register("homeNumber", {
                        required: true,
                      })}
                    />
                  </label>
                </div>
                <div className="modal-grid--item-3 grid-item grid-radio">
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
                <div className="modal-grid--item-4 grid-item grid-radio">
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
                        <input
                          type="text"
                          placeholder="Квартира"
                          {...register("flatNumber", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                    <div class="flat-grid--item-1 grid-item">
                      <p className="grid-item__text">Парадна</p>
                      <label className="form_item--label">
                        <input
                          type="text"
                          placeholder="Парадна"
                          {...register("entranceNumber", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                    <div class="flat-grid--item-2 grid-item">
                      <p className="grid-item__text">Код</p>
                      <label className="form_item--label">
                        <input
                          type="text"
                          placeholder="Код"
                          {...register("entranceCode", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                    <div class="flat-grid--item-3 grid-item">
                      <p className="grid-item__text">Поверх</p>
                      <label className="form_item--label">
                        <input
                          type="text"
                          placeholder="Поверх"
                          {...register("floar", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                )}
                <div className="modal-grid--item-9 grid-item">
                  <p className="grid-item__text">Коментар</p>
                  <label className="form_item--label">
                    <textarea
                      placeholder="Можете тут написати будь-що:)"
                      rows={1}
                      {...register("comment")}
                    />
                  </label>
                </div>
              </div>
              <div className="form-button">
                <button className="btn-main " type="submit" disabled={!isValid}>
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
