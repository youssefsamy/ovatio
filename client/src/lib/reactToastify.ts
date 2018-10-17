import { toast } from 'react-toastify';

const defaultOptions = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    isError: false,
}

const defaultMessages = {
  success: `Données sauvegardées`,
  error: `Une erreur est survenue`,
}

// success with default message and no callback
// notification();

// success with default message and callback
// notification({cb: () => {browserHistory.push('/assureur')}});

// error with default message
// notification({isError: true});

// error with custom message
// notification({isError: true}, 'Custom message'); 

export default (options={}, message=``) => {
  const o = {...defaultOptions, ...options};
  if (o['cb'] && typeof o['cb'] === `function`) {
    o['onClose'] = (childrenProps) => o['cb']();
  }
  if (o.isError) {
    toast.error(message?message:defaultMessages.error, o);
  } else {
    toast.success(message?message:defaultMessages.success, o);
  }
}
