import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const showSuccess = (message) => toast.success(message, toastConfig);
export const showError = (message) => toast.error(message, toastConfig);
export const showWarning = (message) => toast.warn(message, toastConfig);
export const showInfo = (message) => toast.info(message, toastConfig);

export const showConfirmation = (onConfirm, onCancel) => {
    const confirmToast = toast(
        <div>
            <p>Você tem certeza que deseja excluir este post?</p>
            <div>
                <button
                    onClick={() => {
                        onConfirm(); 
                        toast.dismiss(confirmToast); 
                    }}
                    className="btn btn-sm btn-danger"
                >
                    Confirmar
                </button>
                <button
                    onClick={() => {
                        onCancel();
                        toast.dismiss(confirmToast);t
                    }}
                    className="btn btn-secondary btn-sm ms-2"
                >
                    Cancelar
                </button>
            </div>
        </div>,
        {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            theme: "light",
        }
    );
};
