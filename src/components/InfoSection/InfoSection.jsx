/* eslint-disable react-hooks/exhaustive-deps */
//Import React
import React, { useCallback, useState } from 'react';

import ProfileLink from '../ProfileLink/ProfileLink';
import NumberChangeModal from './NumberChangeModal';

import axios from 'axios';
import { url } from '../../api';
import { uploadImage } from '../../utils/firebase';
//Import Mobx
import { observer } from 'mobx-react-lite';
import userStore from '../../store/user-store';
import { convertNumber } from '../../utils/convertNumber';
//Import styles
import '../ProfileGrid/ProfileGrid.scss';
import './InfoSection.scss';
import { CustomSelect } from '../CustomSelect/CustomSelect';

const InfoSection = observer(({ handleSidebar, isSidebarClosed }) => {
  const { name, email, phone, dateOfBirth, token, city, setUserDataToStore, avatar } = userStore;

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    dateOfBirth: dateOfBirth,
    city: city,
    token: token,
  });

  const cityOptions = [
    {
      value: 'Одеса',
      label: 'Одеса',
      className: 'Dropdown-option',
    },
  ];

  const defaultCityOption = cityOptions[0];

  const [cityDrop, setCityDrop] = useState({
    label: defaultCityOption.label,
    value: defaultCityOption.value,
  });

  const [isNumberChanging, setIsNumberChanging] = useState(false);
  const [file, setFile] = useState(undefined);

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, []);

  const handleChangeCity = (e) => {
    setCityDrop(e);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${url}/api/updateInfo/`, formData);

      if (response.status === 200) {
        setUserDataToStore({ ...response.data });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const openModal = () => {
    setIsNumberChanging(true);
  };

  if (!isSidebarClosed) {
    return (
      <section className='grid_layout--main profile_info'>
        <div className='profile_info--head'>
          <img src={avatar} alt='profile' className='mobile-menu__avatar' width={70} />
          <div className='profile_info--head__contacts contacts'>
            <div className='contacts_name'>{name} </div>
            <div className='contacts_phone'>{convertNumber(phone)}</div>
          </div>
          <div className='profile_info--head__button button'>
            <button className='button_link' onClick={openModal}>
              Змінити номер
            </button>
          </div>
          {/*         <div className='profile_info--head__button button'>
            <input
              disabled={!!file}
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
              accept='image/png, image/jpeg, image/jpg, image/webp'
            />
            <label htmlFor='fileInput' className='button_link'>
              Завантажити фото
            </label>
            {file && <button onClick={() => uploadImage(file)}>send</button>}
    </div>*/}
        </div>
        <ProfileLink handleSidebar={handleSidebar}>Інформація</ProfileLink>
        <div className='profile_info--head__mobile'>
          <img
            src='https://via.placeholder.com/70x70'
            alt='profile'
            className='profile_info--head__photo'
          />
          <div className='contacts'>
            <div className='contacts_name'>{name}</div>
            <div className='contacts_phone'>
              {convertNumber(phone)}{' '}
              <button className='button_link' onClick={openModal}>
                Змінити
              </button>
            </div>
            {/*            <div className=''>
              <input
                disabled={file}
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
                accept='image/png, image/jpeg, image/jpg, image/webp'
              />
              <label htmlFor='fileInput' className='button_link label'>
                Завантажити фото
              </label>
              {file && <button onClick={() => uploadImage(file)}>send</button>}
  </div>*/}
          </div>
        </div>
        <div className='profile_info--bonuses__mobile' />
        <div className='profile_info--form'>
          <form onSubmit={handleSubmit}>
            <div className='form'>
              <div className='form_item'>
                <p>Ім'я</p>
                <label className='form_item--label'>
                  <input
                    style={{ fontSize: '16px' }}
                    type='text'
                    placeholder="Ім'я"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className='form_item'>
                <p>Пошта</p>
                <label className='form_item--label'>
                  <input
                    style={{ fontSize: '16px' }}
                    type='text'
                    placeholder='xxx@gmail.com'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className='form_item'>
                <p>Дата народження</p>
                <label className='form_item--label'>
                  <input
                    style={{ fontSize: '16px' }}
                    title='формат дд.мм.рррр'
                    type='text'
                    placeholder='Дата народження'
                    name='dateOfBirth'
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className='form_item'>
                <p>Місто</p>
                <label className='form_item--label'>
                  <CustomSelect
                    placeholder='Оберіть місто'
                    value={cityDrop}
                    options={cityOptions}
                    handleChange={handleChangeCity}
                    className='cityDrop'
                  />
                </label>
              </div>
            </div>
            <div className='form-button'>
              <button className='btn-main ' type='submit' style={{ justifyContent: 'center' }}>
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
