import React, { useEffect } from "react";
import "./SuccessModal.scss";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 3000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <div className="modal__icon">✓</div>
        <p className="modal__message">{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal; // ВАЖНО
