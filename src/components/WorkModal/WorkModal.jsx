import './WorkModal.scss';
import lightModalIcon from '../../assets/light-modal.svg';
import timeModalIcon from '../../assets/time-modal.svg';
import closeIcon from '../../assets/close-time-modal.svg';

import { timeErrorText } from '../../utils/getWorkTime';
const WorkModal = ({ setShowModal, showModal, modalType }) => {
  const closeModalClick = () => setShowModal(false);
  return (
    <div className={`work-modal-backdrop ${showModal ? 'open' : ''}`}>
      <div className='work-modal'>
        <div className='work-modal-container'>
          <button onClick={closeModalClick} type='button' className='work-btn'>
            <img className='work-btn-icon' alt='icon' src={closeIcon} />
          </button>

          {modalType === 'light' && (
            <>
              <img className='work-icon' alt='icon' src={lightModalIcon} />

              <p className='work-title'>Упс....</p>
              <p className='work-subtitle'>
                Ми тимчасово призупинили роботу через відключення світла. Приносимо вибачення за
                незручності та сподіваємося на якнайшвидше відновлення обслуговування.
              </p>
            </>
          )}

          {modalType === 'time' && (
            <>
              <img className='work-icon' alt='icon' src={timeModalIcon} />
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
