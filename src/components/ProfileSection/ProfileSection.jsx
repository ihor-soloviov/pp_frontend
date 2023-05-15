/* eslint-disable jsx-a11y/anchor-is-valid */
import "../Main/Main.scss";
import "./ProfileSection.scss";
import React from "react";

const ProfileSection = () => {
  return (
    <section className="grid_layout--main profile_info">
      <div className="profile_info--head">
        <img
          src="https://via.placeholder.com/70x70"
          alt="profile"
          className="profile_info--head__photo"
        />
        <div className="profile_info--head__contacts contacts">
          <div className="contacts_name">Анна Сміт</div>
          <div className="contacts_phone">+380 (67) 456 45 45</div>
        </div>
        <div className="profile_info--head__button button">
          <a href="#" className="button_link">
            Змінити номер
          </a>
        </div>
        <div className="profile_info--head__button button">
          <a href="#" className="button_link">
            Завантажити фото
          </a>
        </div>
      </div>
      <div className="profile_info--form">
        <form action="post" method="post">
          <div className="form">
            <div className="form_item">
              Ім'я
              <label className="form_item--label">
                <input type="text" placeholder="Ім'я" />
              </label>
            </div>

            <div className="form_item">
              Пошта
              <label className="form_item--label">
                <input type="text" placeholder="xxx@gmail.com" />
              </label>
            </div>

            <div className="form_item">
              Дата народження
              <label className="form_item--label">
                <input type="text" placeholder="Дата народження" />
              </label>
            </div>

            <div className="form_item">
              Місто
              <label className="form_item--label">
                <select>
                  <option value="Оберіть місто" disabled>
                    Оберіть місто
                  </option>
                  <option value="">Одеса</option>
                  <option value="">Ужгород</option>
                </select>
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
    </section>
  );
};

export default ProfileSection;
