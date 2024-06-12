import './WorkModal.scss';
import { timeErrorText } from '../../utils/getWorkTime';
const WorkModal = ({ setShowModal, showModal, modalType }) => {
  const closeModalClick = () => setShowModal(false);
  return (
    <div className={`work-modal-backdrop ${showModal ? 'open' : ''}`}>
      <div className='work-modal'>
        <div className='work-modal-container'>
          <button onClick={closeModalClick} type='button' className='work-btn'>
            <svg
              className='work-btn-icon'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <g clipPath='url(#clip0_124_781)'>
                <path
                  d='M10.0001 8.82166L14.1251 4.69666L15.3034 5.87499L11.1784 9.99999L15.3034 14.125L14.1251 15.3033L10.0001 11.1783L5.87511 15.3033L4.69678 14.125L8.82178 9.99999L4.69678 5.87499L5.87511 4.69666L10.0001 8.82166Z'
                  fill='#12130F'
                />
              </g>
              <defs>
                <clipPath id='clip0_124_781'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>

          {modalType === 'light' ? (
            <>
              <svg
                className='work-icon'
                width='65'
                height='65'
                viewBox='0 0 65 65'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='32.5' cy='32.5' r='32.5' fill='#FF5124' fillOpacity='0.1' />
                <path
                  d='M33.3332 18.6667V38H30.6665V18.6667H33.3332ZM30.6665 41.3333H33.3385V44.0053H30.6665V41.3333Z'
                  fill='#FF5124'
                />
              </svg>
              <p className='work-title'>Упс....</p>
              <p className='work-subtitle'>
                Ми тимчасово призупинили роботу через відключення світла. Приносимо вибачення за
                незручності та сподіваємося на якнайшвидше відновлення обслуговування.
              </p>
            </>
          ) : (
            <>
              <svg
                className='work-icon'
                width='65'
                height='65'
                viewBox='0 0 65 65'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='32.5' cy='32.5' r='32.5' fill='#FF5124' fillOpacity='0.1' />
                <rect width='26' height='26' transform='translate(19 19)' fill='#FFEFEB' />
                <path
                  d='M28.2856 39.4286H35.7141V36.6429C35.7141 35.6214 35.3505 34.747 34.6231 34.0196C33.8957 33.2923 33.0213 32.9286 31.9999 32.9286C30.9784 32.9286 30.104 33.2923 29.3766 34.0196C28.6493 34.747 28.2856 35.6214 28.2856 36.6429V39.4286ZM31.9999 31.0714C33.0213 31.0714 33.8957 30.7077 34.6231 29.9804C35.3505 29.253 35.7141 28.3786 35.7141 27.3571V24.5714H28.2856V27.3571C28.2856 28.3786 28.6493 29.253 29.3766 29.9804C30.104 30.7077 30.9784 31.0714 31.9999 31.0714ZM24.5713 41.2857V39.4286H26.4284V36.6429C26.4284 35.6988 26.6491 34.8126 27.0905 33.9844C27.5319 33.1561 28.1469 32.4946 28.9356 32C28.1463 31.5048 27.5313 30.8433 27.0905 30.0156C26.6497 29.188 26.4291 28.3018 26.4284 27.3571V24.5714H24.5713V22.7143H39.4284V24.5714H37.5713V27.3571C37.5713 28.3012 37.3509 29.1874 36.9101 30.0156C36.4694 30.8439 35.8541 31.5054 35.0641 32C35.8534 32.4952 36.4688 33.157 36.9101 33.9853C37.3515 34.8136 37.5719 35.6994 37.5713 36.6429V39.4286H39.4284V41.2857H24.5713Z'
                  fill='#FF5124'
                />
              </svg>
              <p className='work-text'>{timeErrorText}</p>
              <div className='work-bottom-text-wrap'>
                <p className='work-bottom-text'>Ми працюємо кожень день: 9:30-21:00</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
