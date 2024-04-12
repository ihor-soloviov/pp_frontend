import React, { useEffect, useState } from 'react';
import userStore from '../../store/user-store';
import { headers } from '../../utils/menu';
import AddressModal from '../AddressModal/AddressModal';
import NewAddress from '../NewAddress/NewAddress';
import CreatedAddress from '../CreatedAddress/CreatedAddress';
import ProfileLink from '../ProfileLink/ProfileLink';

import axios from 'axios';
import { url } from '../../api';

import '../ProfileGrid/ProfileGrid.scss';
import './Addresses.scss';
import { observer } from 'mobx-react-lite';

const Addresses = observer(({ handleSidebar, handleError }) => {
  const { token, adresses, addToAdresses } = userStore;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [isAdressesUpdating, setIsAdressesUpdating] = useState(false);

  useEffect(() => {
    const fetchAdresses = async () => {
      if (!token) {
        return;
      }
      try {
        const dataToResponse = { token: token };
        const JSONdata = JSON.stringify(dataToResponse);
        const response = await axios.post(`${url}/api/auth`, JSONdata, {
          headers,
        });
        if (!response?.data) {
          console.log('шоо');
          return;
        }

        addToAdresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAdressesUpdating(false);
      }
    };

    fetchAdresses();
  }, [token, isAdressesUpdating, addToAdresses]);

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isModalOpen]);

  return (
    <section className='grid_layout--main addresses'>
      <ProfileLink handleSidebar={handleSidebar}>Збережені адреси</ProfileLink>
      <div className='addresses_inner'>
        <NewAddress openModal={handleModal} />
        {isModalOpen && (
          <AddressModal
            adresses={isEdit && currentAddressId && adresses}
            closeModal={handleModal}
            setIsAdressesUpdating={setIsAdressesUpdating}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            currentAddressId={currentAddressId}
            setCurrentAddressId={setCurrentAddressId}
            handleError={handleError}
          />
        )}
        {adresses.length > 0 &&
          adresses.map((adress) => (
            <React.Fragment key={adress.addressId}>
              <CreatedAddress
                adress={adress}
                openModal={handleModal}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setCurrentAddressId={setCurrentAddressId}
                setIsAdressesUpdating={setIsAdressesUpdating}
              />
            </React.Fragment>
          ))}
      </div>
    </section>
  );
});

export default Addresses;
