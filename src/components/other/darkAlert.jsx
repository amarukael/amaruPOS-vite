import Swal from 'sweetalert2';

export function darkAlert(options) {
  return Swal.fire({
    ...options,
    background: '#333',
    customClass: {
      container: 'dark-mode',
      popup: 'dark-mode',
      header: 'dark-mode',
      title: 'dark-mode',
      closeButton: 'dark-mode',
      content: 'dark-mode',
      input: 'dark-mode',
      actions: 'dark-mode',
      confirmButton: 'dark-mode',
      cancelButton: 'dark-mode',
      denyButton: 'dark-mode',
      footer: 'dark-mode'
    }
  });
}
