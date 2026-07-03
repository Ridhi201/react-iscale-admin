let popupCallback = null;

export const registerPopupHandler = (callback) => {
  popupCallback = callback;
};

export const showAlert = (message, options = {}) => {
  return new Promise((resolve) => {
    if (popupCallback) {
      popupCallback({ type: 'alert', message, resolve, ...options });
    } else {
      // Fallback to native alert
      alert(message);
      resolve(true);
    }
  });
};

export const showConfirm = (message, options = {}) => {
  return new Promise((resolve) => {
    if (popupCallback) {
      popupCallback({ type: 'confirm', message, resolve, ...options });
    } else {
      // Fallback to native confirm
      const result = confirm(message);
      resolve(result);
    }
  });
};

// Global helpers so we can easily call them from anywhere
window.customAlert = showAlert;
window.customConfirm = showConfirm;
