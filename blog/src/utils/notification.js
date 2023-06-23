import { toast } from 'react-toastify';

export const msgRegister409Err = () => toast.error('Sorry, this user is already busy!');

export const msgSuccessfulRegister = () =>
    toast.success('Registration was successful!');