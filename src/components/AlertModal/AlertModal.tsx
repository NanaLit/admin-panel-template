import './AlertModal.scss';

interface AlertModalProps {
    showAlert: boolean;
    message: string;
    setShowAlert: (value: boolean) => void;
    alertConfirm: () => void;
    alertBtnIsNull?: boolean; 
}

const AlertModal = ({ showAlert, setShowAlert, message, alertConfirm, alertBtnIsNull = false }: AlertModalProps) => {
  return (
    <div className={`alert ${showAlert ? 'show': ''}`}>
        <div className="alert__inner">
          <div className="alert__subtitle">{message}</div>
          <div className="alert__btns">
            {
              alertBtnIsNull ?
              null : 
              <button className="alert__cancel button "onClick={() => { setShowAlert(false); alertConfirm();}}>Ok</button>
            }
            
          </div>
        </div>
    </div>
  )
}

export default AlertModal;