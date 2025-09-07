import Swal from "sweetalert2";


export const alertModal = (state, message, customOptions = {}) => {
  return Swal.fire({
    text: message,
    icon: state,
    theme: 'dark',
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary rounded-[10px]',
    },
    ...customOptions
  })
}

export const confirmModal = (state, message, customOptions = {}) => {
  return Swal.fire({
    icon: state,
    text: message,
    theme: 'dark',
    draggable: true,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary rounded-[10px] me-4',
      cancelButton: 'btn btn-alert rounded-[10px]',
    },
    ...customOptions
  })
}

//  toast
const toastConfig = {
  toast: true,
  position: "top-end",
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },

}

const toast = Swal.mixin(toastConfig);
export const showToast = (state, message, customOptions = {}) => {
  return toast.fire({
    icon: state,
    title: message,
    ...customOptions
  })
}