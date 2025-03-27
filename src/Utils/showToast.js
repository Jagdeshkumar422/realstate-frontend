
import { toast, ToastOptions } from "react-toastify";

/**
 * Displays a toast notification.
 * @param {string} message - The message to display in the toast notification.
 * @param {ToastOptions} [options] - Optional options for customizing the toast appearance.
 * @param {string} [type] - The type of toast to display ("success", "error", or "warning").
 */
export const showToast = (message, type, options)=> {
  let toastType;
  
  switch (type) {
    case "success":
      toastType = toast.success;
      break;
    case "error":
      toastType = toast.error;
      break;
    case "warning":
      toastType = toast.warning;
      break;
    default:
      toastType = toast;
      break;
  }
  toastType(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "error" ? "dark" : "light",
    ...options,
  });
};
