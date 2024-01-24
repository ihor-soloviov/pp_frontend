/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
//Import React
import React, { useEffect, useState } from "react";
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
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"

// Позже перенести это в редакс
const InfoSection = observer(({ handleSidebar, isSidebarClosed }) => {
  const { name, email, phone, dateOfBirth, token, city, setUserDataToStore } =
    userStore;

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    dateOfBirth: dateOfBirth,
    city: city,
    token: token,
  });

  const [isNumberChanging, setIsNumberChanging] = useState(false);
  const [file, setFile] = useState(null);

  const imageListRef = ref(storage, "avatars/")

  useEffect(() => {
    const loadUserDataFromLocalStorage = () => {
      const userData = localStorage.getItem("userData");
      const dataParse = JSON.parse(userData);

      if (!userData) {
        return;
      }


      if (dataParse.isAuthenticated === true) {
        setUserDataToStore(dataParse);
      }
    };

    loadUserDataFromLocalStorage()
  }, [])

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach(item => {
        getDownloadURL(item).then((url) => )
      })
    })
  }, [])
  

  const uploadImage = () => {
    if (!file) {
      return
    }
    const imageRef = ref(storage, `avatars/${file.name + v4()}`)

    uploadBytes(imageRef, file).then(() => {

    })

  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${url}/api/updateInfo/`, formData);

      if (response.status === 200) {
        console.log(response.data);
        setUserDataToStore({ ...response.data });
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsNumberChanging(true)
  };

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
              onClick={openModal}
            >
              Змінити номер
            </button>
          </div>
          <div className="profile_info--head__button button">
            <input
              disabled={file}
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <label for="fileInput" className="button_link">Завантажити фото</label>
            {file && <button onClick={uploadImage}>send</button>}
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
        <div className="profile_info--bonuses__mobile" />
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
                    title="формат дд.мм.рррр"
                    type="text"
                    placeholder="Дата народження"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
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
                    <option disabled value="Ужгород">
                      Ужгород
                    </option>
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
        {isNumberChanging && (
          <NumberChangeModal setIsNumberChanging={setIsNumberChanging} />
        )}
      </section>
    );
  }
});

export default InfoSection;
