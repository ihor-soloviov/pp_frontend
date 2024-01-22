/* eslint-disable jsx-a11y/anchor-is-valid */
//Import React
import React, { useState } from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import axios from "axios";
import { url } from "../../api";

//Import Mobx
import userStore from "../../store/user-store";

//Import styles
import "../ProfileGrid/ProfileGrid.scss";
import "./InfoSection.scss";
import { observer } from "mobx-react-lite";
import NumberChangeModal from "./NumberChangeModal";

// Позже перенести это в редакс
const InfoSection = observer(({ handleSidebar, isSidebarClosed }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birth_date: "",
    city: "",
  });

  const [isNumberChanging, setIsNumberChanging] = useState(false);

  const { name, phone } = userStore;
  // const { authModal, authModalHandler } = modalsStore;

  // Phone formater
  // function formatPhoneNumber(phoneNumber) {
  //   const digitsOnly = phoneNumber.replace(/\D/g, '');

  //   if (digitsOnly.length !== 12) {
  //     return phoneNumber;
  //   }

  //   const countryCode = digitsOnly.substr(0, 3);
  //   const areaCode = digitsOnly.substr(3, 2);
  //   const firstPart = digitsOnly.substr(5, 3);
  //   const secondPart = digitsOnly.substr(8, 2);
  //   const thirdPart = digitsOnly.substr(10, 2);

  //   const formattedNumber = `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;

  //   return formattedNumber;
  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${url}/api/upload/`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("isSidebarClosed", isSidebarClosed);

  if (!isSidebarClosed) {
    return (
      <section className="grid_layout--main profile_info">
        <div className="profile_info--head">
          <img
            src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
            alt="profile"
            className="mobile-menu__avatar"
            width={70}
          />
          <div className="profile_info--head__contacts contacts">
            <div className="contacts_name">{name} </div>
            <div className="contacts_phone">{phone}</div>
          </div>
          <div className="profile_info--head__button button">
            <button
              className="button_link"
              onClick={() => setIsNumberChanging(true)}
            >
              Змінити номер
            </button>
          </div>
          <div className="profile_info--head__button button">
            <a href="#" className="button_link">
              Завантажити фото
            </a>
          </div>
        </div>
        <ProfileLink handleSidebar={handleSidebar}>Інформація</ProfileLink>
        <div className="profile_info--head__mobile">
          <img
            src="https://via.placeholder.com/70x70"
            alt="profile"
            className="profile_info--head__photo"
          />
          <div className="contacts">
            <div className="contacts_name">{name}</div>
            <div className="contacts_phone">
              {phone}{" "}
              <a href="#" className="button_link" disabled>
                Змінити
              </a>
            </div>
            <div className="">
              <a href="#" className="button_link" disabled>
                Завантажити фото
              </a>
            </div>
          </div>
        </div>
        <div className="profile_info--bonuses__mobile"></div>
        <div className="profile_info--form">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="form_item">
                <p>Ім'я</p>
                <label className="form_item--label">
                  <input
                    type="text"
                    placeholder="Ім'я"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form_item">
                <p>Пошта</p>
                <label className="form_item--label">
                  <input
                    type="text"
                    placeholder="xxx@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form_item">
                <p>Дата народження</p>
                <label className="form_item--label">
                  <input
                    type="text"
                    placeholder="Дата народження"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form_item">
                <p>Місто</p>
                <label className="form_item--label">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="Оберіть місто" disabled>
                      Оберіть місто
                    </option>
                    <option value="Одеса">Одеса</option>
                    <option value="Ужгород">Ужгород</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="form-button">
              <button
                className="btn-main "
                type="submit"
                style={{ justifyContent: "center" }}
              >
                Зберегти зміни
              </button>
            </div>
          </form>
        </div>
        {isNumberChanging && <NumberChangeModal setIsNumberChanging={setIsNumberChanging} />}
      </section>
    );
  }
});

export default InfoSection;
