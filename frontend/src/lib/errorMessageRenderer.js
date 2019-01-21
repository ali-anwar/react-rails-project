import toastr from 'toastr';

export function renderError(messages) {
  messages.forEach(message => {
    toastr.error(message);
  })
}
