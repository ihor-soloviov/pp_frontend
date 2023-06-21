import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';


//Import Functios
import {
    dateFormatter,
    calculateTotalPrice,
    filterTimeArray,
    modifyDateString,
} from './OrderTools';

//Import components
import InputText from '../../components/Inputs/InputText';
import InputNumber from '../../components/Inputs/InputNumber';
import InputSelector from '../../components/Inputs/InputSelector';
import RadioButton from '../../components/RadioButton/RadioButton';
import BtnMain from '../../components/Buttons/BtnMain';
import InputTextArea from '../../components/Inputs/InputTextArea';
import Checkbox from '../../components/Inputs/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {thanksModalUpdateState} from '../../store/modalsSlice';
import Popup from '../../components/Popup/Popup';
import Thanks from '../../components/Thanks/Thanks';
import {useLocation, useNavigate} from 'react-router-dom';
import PopupActions from '../../components/PopupActions/PopupActions';
import {setOrder, updateOrder} from "../../store/orderSlice";
import {usePromocode, userPromocode} from "../../store/userSlice";


const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes() + 10).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

const OrderForm = () => {

    //Tools
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Redux
    const shoppingCart = useSelector((state) => state.shoppingCart.products);
    const modals = useSelector((state) => state.modals);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);


    //Time
    const timeArray = [
        {
            id: 1,
            label: '12:00 - 12:30',
            value: '12:00 - 12:30',
        },
        {
            id: 2,
            label: '12:30 - 13:00',
            value: '12:30 - 13:00',
        },
        {
            id: 3,
            label: '13:00 - 13:30',
            value: '13:00 - 13:30',
        },
        {
            id: 4,
            label: '13:30 - 14:00',
            value: '13:30 - 14:00',
        },
        {
            id: 5,
            label: '14:00 - 14:30',
            value: '14:00 - 14:30',
        },
        {
            id: 6,
            label: '14:30 - 15:00',
            value: '14:30 - 15:00',
        },
        {
            id: 7,
            label: '15:00 - 15:30',
            value: '15:00 - 15:30',
        },
        {
            id: 8,
            label: '15:30 - 16:00',
            value: '15:30 - 16:00',
        },
        {
            id: 9,
            label: '16:00 - 16:30',
            value: '16:00 - 16:30',
        },
        {
            id: 10,
            label: '16:30 - 17:00',
            value: '16:30 - 17:00',
        },
        {
            id: 11,
            label: '17:00 - 17:30',
            value: '17:00 - 17:30',
        },
        {
            id: 12,
            label: '17:30 - 18:00',
            value: '17:30 - 18:00',
        },
        {
            id: 13,
            label: '18:00 - 18:30',
            value: '18:00 - 18:30',
        },
        {
            id: 14,
            label: '18:30 - 19:00',
            value: '18:30 - 19:00',
        },
        {
            id: 15,
            label: '19:00 - 19:30',
            value: '19:00 - 19:30',
        },
        {
            id: 16,
            label: '19:30 - 20:00',
            value: '19:30 - 20:00',
        },
        {
            id: 17,
            label: '22:00 - 22:30',
            value: '22:00 - 22:30',
        },
        {
            id: 16,
            label: '23:00 - 23:30',
            value: '23:00 - 23:30',
        },
    ];
    const time = filterTimeArray(timeArray);

    //State
    const [formData, setFormData] = useState({
        spot_id: 1,
        name: '',
        number: '',
        selectedAddress: '',
        street: '',
        houseNumber: '',
        deliveryTime: '',
        howToReciveOrder: '',
        entrance: '',
        apartment: '',
        buildingCode: '',
        floor: '',
        selectedTime: getCurrentDate(),
        promoCode: '',
        bonus: '',
        paymentMethod: 1,
        change: '',
        withoutDevices: false,
        personCount: 1,
        comment: '',
        doNotCall: false,
    });


    const [popupTime, setPopupTime] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(0);
    const [isPromotion, setIsPromotion] = useState(false);
    const [error, setError] = useState({status: false, currentError: ''});


    const [isOrderCreate, setIsOrderCreate] = useState(false);

    //Shopping map object

    const shoppingCartMap = shoppingCart.map((item) => {
        return {product_id: item.id, count: item.count};
    });

    const objMap = {
        spot_id: 1,
        first_name: formData.name,
        phone: formData.number,
        products: shoppingCartMap,
        client_address: {
            address1: `Вулиця: ${formData.street}, Дім: ${formData.houseNumber}`,
            address2: `Парадная: ${formData.entrance}, Квартира: ${formData.apartment}, Код: ${formData.buildingCode}, Поверх: ${formData.floor}, `,
        },
        service_mode: formData.howToReciveOrder === 'Самовивіз' ? 2 : 3,
        delivery_time: `${
            formData.deliveryTime === 'На зараз'
                ? getCurrentDate()
                : dateFormatter(formData.selectedTime)
        }`,
        payment: {
            type: paymentStatus,
            sum: calculateTotalPrice(shoppingCart),
            currency: 'UAH',
        },
        promotion: isPromotion ? {id: "2", involved_products: shoppingCartMap} : '',
        comment: `Тестовый заказ !!!
    Кол-во персон: ${formData.personCount},
      ${formData.comment && ` ${formData.comment}`}, ${
            formData.withoutDevices && 'Без приборов'
        },${formData.doNotCall && 'Не перезванивать'}, ${
            formData.howToReciveOrder === 2 && 'САМОВЫВОЗ'
        } ${isPromotion && 'СКИДКА 40%'}`,
    };

    useEffect(() => {
        if (isOrderCreate) {
            console.log("ORDER DATA:", order)
            dispatch(thanksModalUpdateState({isOpen: true}));
            setTimeout(() => {
                navigate('/');
            }, 10000);
        }
    }, [isOrderCreate])

    //Update fomdata state
    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };


    //Post promocode
    const postPromocode = (token) => {
        const data = {token: token}
        axios
            .post(`https://api.polarpelmeni.com.ua/api/promocode`, JSON.stringify(data), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log("postPromocode/", res)
                setIsPromotion(true)
                dispatch(userPromocode())
            })
            .catch((err) => console.log(err));
    }
    //Get payment url
    const getPaymentUrl = (order_id, amount) => {
        const data = JSON.stringify({
            amount: amount,
            order_id: order_id,
        });

        axios
            .post(`https://api.polarpelmeni.com.ua/api/pay`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                const url = `https://liqpay.ua/api/3/checkout?data=${res.data.data}&signature=${res.data.signature}`;
                window.location.replace(url);
            })
            .catch((err) => console.log(err));
    };


    const createOrder = () => {
        const data = JSON.stringify(objMap);

        axios
            .post(`https://api.polarpelmeni.com.ua/api/createOrder`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                const response = res;

                console.log('res:', response);


                if (formData.paymentMethod === 1) {
                    dispatch(setOrder({order: res.data.response}))


                    getPaymentUrl(
                        order.data.incoming_order_id,
                        calculateTotalPrice(shoppingCart)
                    );
                } else {
                    dispatch(setOrder({order: res.data.response}))
                    setIsOrderCreate(true)
                }


            })
            .catch((err) => console.error(err));
    };

    const onSubmit = () => {
        console.log(objMap);
        if (objMap.phone === '') {
            setError({
                status: true,
                currentError: 'Будь ласка, заповніть поле номеру телефону',
            });
        } else if (formData.howToReciveOrder === '') {
            setError({
                status: true,
                currentError: 'Будь ласка, оберіть спосіб отримання замовлення',
            });
        } else {
            setError({
                status: false,
                currentError: '',
            });
            createOrder();
        }
    };

    function increaseTimeIfMatch(timeString) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        const [hours, minutes, seconds] = timeString.split(':');
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);

        if (currentHour === time.getHours()) {
            time.setHours(time.getHours() + 1);
        }

        const formattedTime = `${time
            .getHours()
            .toString()
            .padStart(2, '0')}:${time
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
        return formattedTime;
    }

    const paymenthCheck = (id) => {
        const data = {order_id: id};
        const dataJSON = JSON.stringify(data);

        axios
            .post(`https://api.polarpelmeni.com.ua/api/getStatus`, dataJSON, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log('api/getStatus', res);
                if (res.data === 'success') {
                    setPaymentStatus(1);
                    setIsOrderCreate(true)
                } else {
                    console.log('ОПЛАТА НЕ УДАЛАСЬ')
                    setError({
                        status: true,
                        currentError: 'Оплата не вдала, спробуйте знову',
                    });
                }
            })
            .catch((err) => console.error(err));
    };


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramValue = searchParams.get('status');

        //        if (paramValue === 'checkout') {


        setTimeout(() => {


            paymenthCheck(order.data.incoming_order_id)


        }, 500)

        //Parse from localstorage
        //
        //            if (order.data.delivery_time) {
        //                const timeSlice = order.data.delivery_time.split(' ');
        //                setPopupTime(increaseTimeIfMatch(timeSlice[1]));

        //                handleChange('deliveryTime', timeSlice[1]);
        //            }


        //Set data


        //        }
    }, [order]);


    return (
        <>
            {modals.thanksModal && (
                <Popup
                    closeModal={() => {
                        dispatch(thanksModalUpdateState({isOpen: false}));
                    }}
                >
                    <Thanks orderId={order.data.incoming_order_id} deliveryTime={popupTime}/>
                </Popup>
            )}
            {error.status === true && (
                <PopupActions action={error.currentError} error/>
            )}

            <section className='order-page__form'>
                <section className='order-page__section'>
                    <h3>Контакти</h3>
                    <div className='order-page__section-inputs'>
                        <InputText
                            name={'Ваше ім’я'}
                            placeholder={'Ваше ім’я'}
                            value={formData.name}
                            onChange={(value) => handleChange('name', value)}
                        />
                        <InputNumber
                            value={formData.number}
                            onChange={(value) => handleChange('number', value)}
                        />
                    </div>
                </section>
                <section className='order-page__section'>
                    <h3>Спосіб отримання замовлення</h3>
                    <section className='order-page__section-inputs'>
                        <InputSelector
                            name={'Збережені адреси'}
                            data={[
                                {
                                    id: 1,
                                    label: 'Немає',
                                    value: 'Немає',
                                },
                            ]}
                            placeholder={'Оберіть адресу'}
                            value={formData.selectedAddress}
                            onChange={(value) => handleChange('selectedAddress', value)}
                        />
                    </section>
                    <section className='order-page__section-inputs order-page__section-inputs-row'>
                        <InputText
                            name={'Вулиця'}
                            placeholder={'Вулиця'}
                            value={formData.street}
                            onChange={(value) => handleChange('street', value)}
                        />
                        <InputText
                            name={'№ Будинку'}
                            placeholder={'№ Будинку'}
                            value={formData.houseNumber}
                            onChange={(value) => handleChange('houseNumber', value)}
                        />
                    </section>
                    <section className='order-page__section-inputs'>
                        <RadioButton
                            data={[
                                {id: 1, value: 'До дверей', label: 'До дверей'},
                                {
                                    id: 2,
                                    value: 'Приватний будинок',
                                    label: 'Приватний будинок',
                                },
                                {id: 4, value: 'Вийду до машини', label: 'Вийду до машини'},
                                {
                                    id: 3,
                                    value: 'Самовивіз',
                                    label: 'Самовивіз',
                                    info: '(Одеса, вул. Лейтенанта Шмідта 25)',
                                },
                            ]}
                            selectedOption={formData.howToReciveOrder}
                            onOptionChange={(event) =>
                                handleChange('howToReciveOrder', event.target.value)
                            }
                        />
                    </section>
                    {formData.howToReciveOrder === 'До дверей' && (
                        <section className='order-page__section-inputs order-page__section-inputs-row'>
                            <InputText
                                name={'Квартира'}
                                placeholder={'№ Квартири'}
                                value={formData.apartment}
                                onChange={(value) => handleChange('apartment', value)}
                            />

                            <InputText
                                name={'Парадна'}
                                placeholder={'№ Парадної'}
                                value={formData.entrance}
                                onChange={(value) => handleChange('entrance', value)}
                            />
                            <InputText
                                name={'Код'}
                                placeholder={'Код'}
                                value={formData.buildingCode}
                                onChange={(value) => handleChange('buildingCode', value)}
                            />
                            <InputText
                                name={'Поверх'}
                                placeholder={'Поверх'}
                                value={formData.floor}
                                onChange={(value) => handleChange('floor', value)}
                            />
                        </section>
                    )}
                </section>
                <section className='order-page__section'>
                    <h3>Час отримання</h3>
                    <section className='order-page__section-inputs'>
                        <RadioButton
                            data={[
                                {id: 1, value: 'На зараз', label: 'На зараз'},
                                {
                                    id: 2,
                                    value: 'Вказати точний час',
                                    label: 'Вказати точний час',
                                },
                            ]}
                            selectedOption={formData.deliveryTime}
                            onOptionChange={(event) =>
                                handleChange('deliveryTime', event.target.value)
                            }
                            column
                        />
                        {formData.deliveryTime === 'Вказати точний час' && (
                            <InputSelector
                                name={'Час'}
                                placeholder={'Час'}
                                data={time}
                                value={formData.selectedTime}
                                onChange={(value) => handleChange('selectedTime', value)}
                            />
                        )}
                    </section>
                </section>
                <section className='order-page__section'>
                    <h3>Додати промокод</h3>
                    <section className='order-page__section-inputs order-page__section-inputs-row'>
                        <InputSelector
                            name={'Промокод'}
                            placeholder={'Промокод'}
                            data={
                                user.promocode40 ? [{id: 0, label: '40%', value: '40%'}] : []
                            }
                            value={formData.paymentMethod}
                            onChange={(value) => handleChange('promoCode', value)}
                        />
                        <BtnMain name={'Застосувати'} onClick={() => {
                            postPromocode(user.token)
                        }} disabled={user.promocode40 ? false : false}/>
                    </section>
                    {user.promocode40 &&
                        <div className={`order-page__have-promocode`}><span>У ВАС Е ПРОМОКОД НА СКИДКУ 40%</span>
                            <div className="order-page__arrow">
                                <svg width="17"
                                     height="20"

                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.16645 11.7814L12.7425 8.20535L13.6851 9.14802L8.49979 14.3334L3.31445 9.14802L4.25712 8.20535L7.83312 11.7814V3.66669H9.16645V11.7814Z"
                                        fill="#12130F"/>
                                </svg>
                            </div>
                        </div>}
                </section>
                <section className='order-page__section'>
                    <h3>Спосіб оплати</h3>
                    <div className='order-page__section-inputs'>
                        <InputText
                            name={'Використати бонуси'}
                            placeholder={'0'}
                            value={formData.bonus}
                            onChange={(value) => handleChange('bonus', value)}
                        />
                    </div>
                    <div className='order-page__section-inputs order-page__section-inputs-row'>
                        <InputSelector
                            name={'Оплата'}
                            placeholder={'Онлайн'}
                            data={[
                                {id: 0, label: 'Онлайн', value: 'Онлайн'},
                                {id: 1, label: 'Готівка', value: 'Готівка'},
                            ]}
                            value={formData.paymentMethod}
                            onChange={(value) => handleChange('paymentMethod', value)}
                        />
                        <InputText
                            name={'Сдача с'}
                            placeholder={'500'}
                            value={formData.change}
                            onChange={(value) => handleChange('change', value)}
                        />
                    </div>
                </section>
                <section className='order-page__section'>
                    <h3>Додатково</h3>
                    <section className='order-page__section-inputs order-page__section-inputs-row'>
                        <div className='order-page__block'>
                            <span>Кількість персон:</span>
                            <Checkbox
                                isChecked={formData.withoutDevices}
                                onCheckboxChange={() =>
                                    handleChange('withoutDevices', !formData.withoutDevices)
                                }
                                label={'Без приборів'}
                            />
                        </div>
                        <div className='order-page__block'>
                            <span>Кількість персон:</span>
                            <div className='counter'>
                                <div
                                    className='counter__btn'
                                    onClick={() => {
                                        if (formData.personCount > 1) {
                                            handleChange('personCount', formData.personCount - 1);
                                        }
                                    }}
                                >
                                    -
                                </div>
                                <div className='counter__value'>{formData.personCount}</div>
                                <div
                                    className='counter__btn'
                                    onClick={() =>
                                        handleChange('personCount', formData.personCount + 1)
                                    }
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='order-page__section-inputs'>
                        <InputTextArea
                            name={'Коментар до замовлення'}
                            placeholder={'Можете тут написати будь-що:)'}
                            value={formData.comment}
                            onChange={(value) => handleChange('comment', value)}
                        />
                    </section>
                    <section className='order-page__section-inputs'>
                        <div className='order-page__block'>
                            <Checkbox
                                isChecked={formData.doNotCall}
                                onCheckboxChange={() =>
                                    handleChange('doNotCall', !formData.doNotCall)
                                }
                                label={'Не передзвонювати мені'}
                            />
                        </div>
                    </section>
                </section>

                <BtnMain
                    name={'Оформити замовлення'}
                    fullWide
                    onClick={() => onSubmit()}
                />
            </section>
        </>
    );
};

export default OrderForm;


/* Flow test:
Flow 1: Devivery type address / Payment cash
Flow 2: Devivery type address / Payment cart √
Flow 2.1: Devivery type address / Payment cart - dont'pay
Flow 3: Devivery type self / Payment cash
Flow 4: Devivery type self / Payment cart
Flow 4.1: Devivery type self / Payment cart - don't pay

*/