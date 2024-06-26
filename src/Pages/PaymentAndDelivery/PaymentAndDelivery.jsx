import React from "react";
import Container from "../../components/Container/Container";
import { Map } from "../../components/Map/Map";
import "./PaymentAndDelivery.scss";

export const PaymentAndDelivery = () => (
  <section className="paymentAndDelivery">
    <Container>
      <div className="paymentAndDelivery__content">
        <section className="paymentAndDelivery__block">
          <h3 className="title__h3">Способи оплати</h3>
          <div className="paymentAndDelivery__paymentMethodts">
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Apple pay</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  width="2.187vw"
                  height="2.187vw"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="2.5"
                    fill="white"
                    stroke="#E0E8F0"
                  ></rect>
                  <path
                    d="M31.6716 13H10.3284C10.2395 13 10.1505 13 10.0617 13.0005C9.98674 13.0011 9.91191 13.0019 9.83707 13.0039C9.67387 13.0084 9.50927 13.018 9.3481 13.047C9.18436 13.0766 9.03199 13.1247 8.88335 13.2006C8.73722 13.275 8.60343 13.3724 8.48749 13.4887C8.37151 13.6049 8.2743 13.7387 8.20001 13.8853C8.12431 14.0343 8.07621 14.187 8.04695 14.3512C8.01783 14.5127 8.00813 14.6777 8.00373 14.841C8.00172 14.916 8.00086 14.991 8.00037 15.066C7.99985 15.1551 8.00003 15.2441 8.00003 15.3334V27.346C8.00003 27.4353 7.99985 27.5242 8.00037 27.6135C8.00086 27.6884 8.00172 27.7634 8.00373 27.8384C8.00813 28.0016 8.01783 28.1666 8.04695 28.328C8.07621 28.4923 8.12431 28.645 8.20001 28.7939C8.2743 28.9405 8.37151 29.0745 8.48749 29.1906C8.60343 29.307 8.73722 29.4044 8.88335 29.4787C9.03199 29.5547 9.18436 29.6029 9.3481 29.6324C9.50927 29.6613 9.67387 29.6711 9.83707 29.6755C9.91191 29.6772 9.98674 29.6782 10.0617 29.6786C10.1505 29.6792 10.2395 29.6792 10.3284 29.6792H31.6716C31.7603 29.6792 31.8494 29.6792 31.9381 29.6786C32.0129 29.6782 32.0878 29.6772 32.163 29.6755C32.3258 29.6711 32.4904 29.6613 32.6519 29.6324C32.8155 29.6029 32.9679 29.5547 33.1165 29.4787C33.2628 29.4044 33.3962 29.307 33.5124 29.1906C33.6282 29.0745 33.7254 28.9405 33.7999 28.7939C33.8757 28.645 33.9238 28.4923 33.9529 28.328C33.982 28.1666 33.9915 28.0016 33.9959 27.8384C33.998 27.7634 33.999 27.6884 33.9993 27.6135C34 27.5242 34 27.4353 34 27.346V15.3334C34 15.2441 34 15.1551 33.9993 15.066C33.999 14.991 33.998 14.916 33.9959 14.841C33.9915 14.6777 33.982 14.5127 33.9529 14.3512C33.9238 14.187 33.8757 14.0343 33.7999 13.8853C33.7254 13.7387 33.6282 13.6049 33.5124 13.4887C33.3962 13.3724 33.2628 13.275 33.1165 13.2006C32.9679 13.1247 32.8155 13.0766 32.6519 13.047C32.4904 13.018 32.3258 13.0084 32.163 13.0039C32.0878 13.0019 32.0129 13.0011 31.9381 13.0005C31.8494 13 31.7603 13 31.6716 13Z"
                    fill="black"
                  ></path>
                  <path
                    d="M31.6715 13.5559L31.934 13.5564C32.0052 13.5569 32.0763 13.5577 32.1478 13.5596C32.2722 13.563 32.4178 13.5698 32.5534 13.5941C32.6713 13.6154 32.7702 13.6478 32.8651 13.6962C32.9588 13.7439 33.0447 13.8064 33.1196 13.8814C33.1949 13.9569 33.2573 14.0431 33.3056 14.138C33.3536 14.2324 33.3857 14.331 33.4068 14.45C33.4311 14.5845 33.4378 14.7307 33.4412 14.8562C33.4431 14.927 33.4441 14.9978 33.4444 15.0702C33.4451 15.1579 33.4451 15.2455 33.4451 15.3333V27.346C33.4451 27.4338 33.4451 27.5213 33.4444 27.6108C33.4441 27.6816 33.4431 27.7524 33.4412 27.8233C33.4378 27.9486 33.4311 28.0947 33.4065 28.2308C33.3857 28.3482 33.3536 28.4468 33.3053 28.5416C33.2572 28.6363 33.1949 28.7224 33.1199 28.7974C33.0446 28.873 32.959 28.9353 32.8642 28.9835C32.77 29.0316 32.6713 29.064 32.5545 29.085C32.4161 29.1098 32.2645 29.1166 32.1503 29.1197C32.0784 29.1213 32.0069 29.1222 31.9337 29.1226C31.8464 29.1233 31.7588 29.1233 31.6715 29.1233H10.3283C10.3271 29.1233 10.326 29.1233 10.3248 29.1233C10.2385 29.1233 10.152 29.1233 10.0642 29.1226C9.99253 29.1222 9.92105 29.1213 9.85193 29.1197C9.73513 29.1166 9.5834 29.1098 9.44613 29.0852C9.32837 29.064 9.22964 29.0316 9.1342 28.9828C9.04029 28.9351 8.95479 28.8728 8.87937 28.7971C8.80454 28.7223 8.74235 28.6365 8.69427 28.5417C8.64614 28.4469 8.61394 28.348 8.59277 28.2292C8.56829 28.0934 8.56157 27.9478 8.55821 27.8234C8.55629 27.7522 8.55549 27.681 8.55503 27.6102L8.55469 27.4012L8.5547 27.346V15.3333L8.55469 15.2782L8.55502 15.0696C8.55549 14.9984 8.55629 14.9271 8.55821 14.856C8.56157 14.7315 8.56829 14.5858 8.59297 14.4489C8.61395 14.3312 8.64614 14.2323 8.69452 14.137C8.74222 14.0429 8.80452 13.957 8.87975 13.8817C8.95468 13.8065 9.04046 13.7441 9.13497 13.6959C9.22939 13.6478 9.32831 13.6154 9.44607 13.5942C9.58175 13.5697 9.72738 13.563 9.8521 13.5596C9.9232 13.5577 9.99429 13.5569 10.0649 13.5564L10.3283 13.5559H31.6715Z"
                    fill="white"
                  ></path>
                  <path
                    d="M15.0975 18.61C15.3201 18.331 15.4712 17.9563 15.4314 17.5735C15.1055 17.5897 14.7078 17.7889 14.4776 18.0682C14.2708 18.3073 14.0879 18.6976 14.1356 19.0644C14.5014 19.0962 14.8669 18.8812 15.0975 18.61Z"
                    fill="black"
                  ></path>
                  <path
                    d="M15.4273 19.136C14.896 19.1043 14.4443 19.4382 14.1906 19.4382C13.9368 19.4382 13.5483 19.152 13.1281 19.1597C12.5812 19.1678 12.0737 19.4776 11.7962 19.9705C11.2253 20.9564 11.6455 22.4188 12.2006 23.2218C12.4702 23.6191 12.7951 24.0565 13.2232 24.0408C13.6277 24.0249 13.7862 23.7783 14.2778 23.7783C14.7691 23.7783 14.9119 24.0408 15.3401 24.0328C15.7841 24.0248 16.0617 23.6354 16.3313 23.2377C16.6405 22.7849 16.7671 22.3476 16.7751 22.3236C16.7671 22.3156 15.9189 21.9896 15.911 21.0119C15.903 20.1932 16.577 19.8038 16.6087 19.7797C16.2281 19.2156 15.6335 19.152 15.4273 19.136Z"
                    fill="black"
                  ></path>
                  <path
                    d="M20.0534 18.0281C21.2081 18.0281 22.0121 18.8257 22.0121 19.9869C22.0121 21.1522 21.1915 21.9539 20.0244 21.9539H18.746V23.9912H17.8223V18.0281H20.0534V18.0281ZM18.746 21.177H19.8058C20.61 21.177 21.0677 20.7431 21.0677 19.991C21.0677 19.2389 20.61 18.8092 19.81 18.8092H18.746V21.177Z"
                    fill="black"
                  ></path>
                  <path
                    d="M22.2524 22.7557C22.2524 21.9952 22.8339 21.5283 23.865 21.4704L25.0526 21.4002V21.0655C25.0526 20.582 24.7268 20.2927 24.1825 20.2927C23.6669 20.2927 23.3452 20.5406 23.267 20.9291H22.4257C22.4752 20.1439 23.1432 19.5654 24.2155 19.5654C25.2671 19.5654 25.9392 20.1233 25.9392 20.9952V23.9912H25.0855V23.2763H25.065C24.8135 23.7598 24.265 24.0656 23.6959 24.0656C22.8463 24.0656 22.2524 23.5367 22.2524 22.7557ZM25.0526 22.3631V22.0201L23.9845 22.0862C23.4525 22.1234 23.1515 22.359 23.1515 22.7309C23.1515 23.111 23.4649 23.359 23.9433 23.359C24.566 23.359 25.0526 22.9292 25.0526 22.3631Z"
                    fill="black"
                  ></path>
                  <path
                    d="M26.7463 25.5906V24.8674C26.8122 24.8839 26.9606 24.8839 27.0349 24.8839C27.4473 24.8839 27.67 24.7103 27.806 24.2641C27.806 24.2558 27.8844 23.9996 27.8844 23.9954L26.3174 19.6439H27.2823L28.3794 23.1814H28.3958L29.4929 19.6439H30.4331L28.8081 24.2185C28.4371 25.2724 28.0082 25.6112 27.1092 25.6112C27.0349 25.6112 26.8122 25.6029 26.7463 25.5906Z"
                    fill="black"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Приват 24</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  width="2.187vw"
                  height="2.187vw"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="2.5"
                    fill="white"
                    stroke="#E0E8F0"
                  ></rect>
                  <path
                    d="M8.21387 21.0523C8.21387 28.1429 13.9619 33.891 21.0526 33.891C28.1432 33.891 33.8913 28.1429 33.8913 21.0523C33.8913 13.9616 28.1432 8.21356 21.0526 8.21356C13.9619 8.21356 8.21387 13.9616 8.21387 21.0523Z"
                    fill="url(#paint0_linear)"
                  ></path>
                  <path
                    d="M21 8C13.8256 8 8 13.8407 8 21.0522C8 28.2638 13.8173 34.1045 21 34.1045C28.1827 34.1045 34 28.2638 34 21.0522C34 13.8407 28.1827 8 21 8ZM21 32.6671C14.6117 32.6671 9.43157 27.4662 9.43157 21.0522C9.43157 14.6383 14.6117 9.43732 21 9.43732C27.3883 9.43732 32.5684 14.6383 32.5684 21.0522C32.5684 27.4662 27.3883 32.6671 21 32.6671Z"
                    fill="#8DC641"
                  ></path>
                  <path
                    d="M25.5429 18.0862L22.6467 22.3982H25.5429V18.0862ZM26.6352 16.3415V22.4065H27.9096V23.5032H26.6352V25.7713H25.5346V23.5032H21.4385V22.3234L25.5677 16.3498H26.6352V16.3415ZM20.2304 24.6663V25.763H14.0903V25.7298C14.1483 24.6996 14.4131 23.9435 14.9261 23.3204C15.3399 22.8053 15.8446 22.4231 16.879 21.7751C16.879 21.7751 17.2431 21.5424 17.3507 21.476C17.9051 21.1187 18.2609 20.8362 18.5505 20.5122C18.9064 20.0968 19.0884 19.6482 19.0884 19.1164C19.0884 18.0862 18.3602 17.38 17.3176 17.38C16.1012 17.38 15.4805 18.3105 15.4474 19.698V19.7229H14.3551V19.698L14.3469 19.4488C14.3469 17.5877 15.555 16.3415 17.3755 16.3415C19.1546 16.3415 20.3131 17.4216 20.3131 19.0915C20.3131 19.9473 20.0069 20.6368 19.4194 21.2433C18.9808 21.7086 18.5257 22.016 17.5079 22.6391C17.4914 22.6474 17.4831 22.6557 17.4665 22.6641C17.4169 22.689 17.1935 22.8219 17.1355 22.8635C16.6473 23.1542 16.3494 23.3619 16.0846 23.6112C15.7619 23.9186 15.5467 24.2592 15.4474 24.658H20.2304V24.6663Z"
                    fill="white"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="8.21658"
                      y1="21.0523"
                      x2="33.8912"
                      y2="21.0523"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#333333"></stop>
                      <stop offset="1"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Privat Pay</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  width="2.187vw"
                  height="2.187vw"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="2.5"
                    fill="white"
                    stroke="#E0E8F0"
                  ></rect>
                  <path
                    d="M8.21387 21.0523C8.21387 28.1429 13.9619 33.891 21.0526 33.891C28.1432 33.891 33.8913 28.1429 33.8913 21.0523C33.8913 13.9616 28.1432 8.21356 21.0526 8.21356C13.9619 8.21356 8.21387 13.9616 8.21387 21.0523Z"
                    fill="url(#paint0_linear)"
                  ></path>
                  <path
                    d="M21 8C13.8256 8 8 13.8407 8 21.0522C8 28.2638 13.8173 34.1045 21 34.1045C28.1827 34.1045 34 28.2638 34 21.0522C34 13.8407 28.1827 8 21 8ZM21 32.6671C14.6117 32.6671 9.43157 27.4662 9.43157 21.0522C9.43157 14.6383 14.6117 9.43732 21 9.43732C27.3883 9.43732 32.5684 14.6383 32.5684 21.0522C32.5684 27.4662 27.3883 32.6671 21 32.6671Z"
                    fill="#8DC641"
                  ></path>
                  <path
                    d="M25.5429 18.0862L22.6467 22.3982H25.5429V18.0862ZM26.6352 16.3415V22.4065H27.9096V23.5032H26.6352V25.7713H25.5346V23.5032H21.4385V22.3234L25.5677 16.3498H26.6352V16.3415ZM20.2304 24.6663V25.763H14.0903V25.7298C14.1483 24.6996 14.4131 23.9435 14.9261 23.3204C15.3399 22.8053 15.8446 22.4231 16.879 21.7751C16.879 21.7751 17.2431 21.5424 17.3507 21.476C17.9051 21.1187 18.2609 20.8362 18.5505 20.5122C18.9064 20.0968 19.0884 19.6482 19.0884 19.1164C19.0884 18.0862 18.3602 17.38 17.3176 17.38C16.1012 17.38 15.4805 18.3105 15.4474 19.698V19.7229H14.3551V19.698L14.3469 19.4488C14.3469 17.5877 15.555 16.3415 17.3755 16.3415C19.1546 16.3415 20.3131 17.4216 20.3131 19.0915C20.3131 19.9473 20.0069 20.6368 19.4194 21.2433C18.9808 21.7086 18.5257 22.016 17.5079 22.6391C17.4914 22.6474 17.4831 22.6557 17.4665 22.6641C17.4169 22.689 17.1935 22.8219 17.1355 22.8635C16.6473 23.1542 16.3494 23.3619 16.0846 23.6112C15.7619 23.9186 15.5467 24.2592 15.4474 24.658H20.2304V24.6663Z"
                    fill="white"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="8.21658"
                      y1="21.0523"
                      x2="33.8912"
                      y2="21.0523"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#333333"></stop>
                      <stop offset="1"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Masterpass</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  width="2.187vw"
                  height="2.187vw"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="2.5"
                    fill="white"
                    stroke="#E0E8F0"
                  ></rect>
                  <g clipPath="url(#clip0)">
                    <path
                      d="M24.8646 15.2769H17.3628V27.5294H24.8646V15.2769Z"
                      fill="#FF5F00"
                    ></path>
                    <path
                      d="M18.1353 21.4042C18.1343 20.2244 18.4018 19.0599 18.9174 17.9987C19.433 16.9375 20.1832 16.0075 21.1113 15.279C19.9618 14.3757 18.5814 13.8139 17.1277 13.658C15.6741 13.502 14.2059 13.7582 12.891 14.3972C11.576 15.0362 10.4674 16.0323 9.69181 17.2716C8.91619 18.5109 8.50488 19.9433 8.50488 21.4053C8.50488 22.8673 8.91619 24.2998 9.69181 25.5391C10.4674 26.7783 11.576 27.7744 12.891 28.4134C14.2059 29.0524 15.6741 29.3086 17.1277 29.1527C18.5814 28.9967 19.9618 28.435 21.1113 27.5316C20.1829 26.8029 19.4325 25.8726 18.9169 24.811C18.4013 23.7494 18.134 22.5844 18.1353 21.4042Z"
                      fill="#EB001B"
                    ></path>
                    <path
                      d="M32.9745 26.233V25.9819H33.0828V25.93H32.8252V25.9819H32.9269V26.233H32.9745ZM33.4745 26.233V25.93H33.3966L33.3057 26.1464L33.2148 25.93H33.1369V26.233H33.1931V26.0036L33.2776 26.2005H33.336L33.4204 26.0036V26.233H33.4745Z"
                      fill="#F79E1B"
                    ></path>
                    <path
                      d="M33.7189 21.4042C33.7188 22.8663 33.3074 24.2989 32.5317 25.5382C31.7559 26.7775 30.6471 27.7736 29.332 28.4125C28.017 29.0514 26.5486 29.3074 25.0949 29.1513C23.6412 28.9951 22.2607 28.4331 21.1113 27.5295C22.039 26.8004 22.7891 25.8701 23.3048 24.8089C23.8205 23.7476 24.0885 22.5831 24.0885 21.4032C24.0885 20.2232 23.8205 19.0587 23.3048 17.9975C22.7891 16.9362 22.039 16.006 21.1113 15.2769C22.2607 14.3732 23.6412 13.8112 25.0949 13.655C26.5486 13.4989 28.017 13.7549 29.332 14.3938C30.6471 15.0327 31.7559 16.0288 32.5317 17.2681C33.3074 18.5074 33.7188 19.94 33.7189 21.4021V21.4042Z"
                      fill="#F79E1B"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="26"
                        height="18.8085"
                        fill="white"
                        transform="translate(8 12)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Mastercard</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  width="2.187vw"
                  height="2.187vw"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="2.5"
                    fill="white"
                    stroke="#E0E8F0"
                  ></rect>
                  <g clipPath="url(#clip0)">
                    <path
                      d="M24.8646 15.2769H17.3628V27.5294H24.8646V15.2769Z"
                      fill="#FF5F00"
                    ></path>
                    <path
                      d="M18.1353 21.4042C18.1343 20.2244 18.4018 19.0599 18.9174 17.9987C19.433 16.9375 20.1832 16.0075 21.1113 15.279C19.9618 14.3757 18.5814 13.8139 17.1277 13.658C15.6741 13.502 14.2059 13.7582 12.891 14.3972C11.576 15.0362 10.4674 16.0323 9.69181 17.2716C8.91619 18.5109 8.50488 19.9433 8.50488 21.4053C8.50488 22.8673 8.91619 24.2998 9.69181 25.5391C10.4674 26.7783 11.576 27.7744 12.891 28.4134C14.2059 29.0524 15.6741 29.3086 17.1277 29.1527C18.5814 28.9967 19.9618 28.435 21.1113 27.5316C20.1829 26.8029 19.4325 25.8726 18.9169 24.811C18.4013 23.7494 18.134 22.5844 18.1353 21.4042Z"
                      fill="#EB001B"
                    ></path>
                    <path
                      d="M32.9745 26.233V25.9819H33.0828V25.93H32.8252V25.9819H32.9269V26.233H32.9745ZM33.4745 26.233V25.93H33.3966L33.3057 26.1464L33.2148 25.93H33.1369V26.233H33.1931V26.0036L33.2776 26.2005H33.336L33.4204 26.0036V26.233H33.4745Z"
                      fill="#F79E1B"
                    ></path>
                    <path
                      d="M33.7189 21.4042C33.7188 22.8663 33.3074 24.2989 32.5317 25.5382C31.7559 26.7775 30.6471 27.7736 29.332 28.4125C28.017 29.0514 26.5486 29.3074 25.0949 29.1513C23.6412 28.9951 22.2607 28.4331 21.1113 27.5295C22.039 26.8004 22.7891 25.8701 23.3048 24.8089C23.8205 23.7476 24.0885 22.5831 24.0885 21.4032C24.0885 20.2232 23.8205 19.0587 23.3048 17.9975C22.7891 16.9362 22.039 16.006 21.1113 15.2769C22.2607 14.3732 23.6412 13.8112 25.0949 13.655C26.5486 13.4989 28.017 13.7549 29.332 14.3938C30.6471 15.0327 31.7559 16.0288 32.5317 17.2681C33.3074 18.5074 33.7188 19.94 33.7189 21.4021V21.4042Z"
                      fill="#F79E1B"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="26"
                        height="18.8085"
                        fill="white"
                        transform="translate(8 12)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Visa</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.187vw"
                  viewBox="0 0 141.732 141.732"
                >
                  <g fill="#2566af">
                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"></path>
                  </g>
                  <path
                    d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"
                    fill="#e6a540"
                  ></path>
                  <path fill="none" d="M0 0h141.732v141.732H0z"></path>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Visa Checkout</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.187vw"
                  viewBox="0 0 141.732 141.732"
                >
                  <g fill="#2566af">
                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"></path>
                  </g>
                  <path
                    d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"
                    fill="#e6a540"
                  ></path>
                  <path fill="none" d="M0 0h141.732v141.732H0z"></path>
                </svg>
              </div>
            </div>
            <div className="paymentAndDelivery__paymentMethodt">
              <div className="paymentAndDelivery__name">Google Pay</div>
              <div className="paymentAndDelivery__ico">
                <svg
                  role="presentation"
                  fill="#A1A1A1"
                  height="2.187vw"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 435.97 173.13"
                  className="main-header__logo-image"
                >
                  <path
                    d="M206.2,84.58v50.75H190.1V10h42.7a38.61,38.61,0,0,1,27.65,10.85A34.88,34.88,0,0,1,272,47.3a34.72,34.72,0,0,1-11.55,26.6q-11.2,10.68-27.65,10.67H206.2Zm0-59.15V69.18h27a21.28,21.28,0,0,0,15.93-6.48,21.36,21.36,0,0,0,0-30.63,21,21,0,0,0-15.93-6.65h-27Z"
                    fill="#5f6368"
                  ></path>
                  <path
                    d="M309.1,46.78q17.85,0,28.18,9.54T347.6,82.48v52.85H332.2v-11.9h-.7q-10,14.7-26.6,14.7-14.17,0-23.71-8.4a26.82,26.82,0,0,1-9.54-21q0-13.31,10.06-21.17t26.86-7.88q14.34,0,23.62,5.25V81.25A18.33,18.33,0,0,0,325.54,67,22.8,22.8,0,0,0,310,61.13q-13.49,0-21.35,11.38l-14.18-8.93Q286.17,46.78,309.1,46.78Zm-20.83,62.3a12.86,12.86,0,0,0,5.34,10.5,19.64,19.64,0,0,0,12.51,4.2,25.67,25.67,0,0,0,18.11-7.52q8-7.53,8-17.67-7.53-6-21-6-9.81,0-16.36,4.73C290.46,100.52,288.27,104.41,288.27,109.08Z"
                    fill="#5f6368"
                  ></path>
                  <path
                    d="M436,49.58,382.24,173.13H365.62l19.95-43.23L350.22,49.58h17.5l25.55,61.6h.35l24.85-61.6Z"
                    fill="#5f6368"
                  ></path>
                  <path
                    d="M141.14,73.64A85.79,85.79,0,0,0,139.9,59H72V86.73h38.89a33.33,33.33,0,0,1-14.38,21.88v18h23.21C133.31,114.08,141.14,95.55,141.14,73.64Z"
                    fill="#4285f4"
                  ></path>
                  <path
                    d="M72,144c19.43,0,35.79-6.38,47.72-17.38l-23.21-18C90.05,113,81.73,115.5,72,115.5c-18.78,0-34.72-12.66-40.42-29.72H7.67v18.55A72,72,0,0,0,72,144Z"
                    fill="#34a853"
                  ></path>
                  <path
                    d="M31.58,85.78a43.14,43.14,0,0,1,0-27.56V39.67H7.67a72,72,0,0,0,0,64.66Z"
                    fill="#fbbc04"
                  ></path>
                  <path
                    d="M72,28.5A39.09,39.09,0,0,1,99.62,39.3h0l20.55-20.55A69.18,69.18,0,0,0,72,0,72,72,0,0,0,7.67,39.67L31.58,58.22C37.28,41.16,53.22,28.5,72,28.5Z"
                    fill="#ea4335"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div className="paymentAndDelivery__block map">
          <div className="deliveryInfo">
            <h3 className="title__h3">Умови доставки</h3>
            <ul className="paymentAndDelivery__list">
              <li>Доставка здійснюється нашим кур'єром</li>
              <li>Безкоштовна доставка пи сумі замовлення на 500+ грн</li>
              <li>Вартість доставки - 60 грн</li>
            </ul>
          </div>
          <div className="deliveryMap">
            <Map poligon={true} zoom={12} />
            <h3>Райони доставки</h3>
          </div>
        </div>
        <div className="paymentAndDelivery__block">
          <h3 className="title__h3">Умови повернення:</h3>
          <p className="text text__color--primary">
            Умови повернення для сайту Polar Pelmeni:
            <br />
            <br />
            Шановні клієнти Polar Pelmeni, ваша насолода нашою їжею -
            пріоритет! Ми гарантуємо якість нашої продукції та надаємо
            можливість повернення замовлення в таких умовах:
          </p>
          <ol className="paymentAndDelivery__list paymentAndDelivery__list--num">
            <li>
              1.Повернення доставки: Ми здійснюємо повернення коштів за доставку
              в разі, якщо продукція неякісна та в замовленні присутній
              щонайменше 70% від загального обсягу замовлення.
            </li>
            <li>
              2.Умови повернення: Щоб здійснити повернення, будь ласка,
              зверніться до нашої служби підтримки за телефоном +380 (98)
              727-19-91 або електронною поштою polarpelmeni.od@gmail.com. Наші
              співробітники будуть раді допомогти вам із здійсненням
              повернення та нададуть додаткові інструкції.
            </li>
            <li>
              3.Перевірка продукції: Перед поверненням товару, будь ласка,
              збережіть упаковку та зробіть фотографії некачественних
              продуктів для нашої внутрішньої перевірки.
            </li>
            <li>
              4.Термін повернення: Повернення повинно бути здійснене менше до 5
              годин з моменту отримання замовлення.
            </li>
            <li>
              5.Повернення коштів: Після перевірки поверненого товару, ми
              повернемо кошти на ваш рахунок або виконаємо повернення на
              кредитну карту, використану для замовлення.
            </li>
          </ol>
          <p className="text text__color--primary">
            Ми дуже цінуємо вашу довіру та розуміємо важливість якості
            продуктів, які ми пропонуємо. В разі будь-яких питань чи
            необхідності допомоги, будь ласка, зв'яжіться з нами. Дякуємо, що
            обираєте Polar Pelmeni!
          </p>
        </div>
      </div>
    </Container>
  </section>
);

