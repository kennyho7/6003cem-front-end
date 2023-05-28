import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessageHandler = (msg, type) => {
  switch (type) {
    case "success": {
      toast.success(msg, { autoClose: 3000 });
      break;
    }
    case "warn": {
      toast.warn(msg, { autoClose: 3000 });
      break;
    }
    case "error": {
      toast.error(msg, { autoClose: 3000 });
      break;
    }
    case "info": {
      toast.info(msg, { autoClose: 3000 });
      break;
    }
    default: {
      toast.warn(msg, { autoClose: 3000 });
      break;
    }
  }
};

export default ToastMessageHandler;
