import { toast } from 'react-toastify';

export const errorMessage = errMessage => toast.error(errMessage);

export const msgSuccessfulRegister = () =>
    toast.success('Registration was successful!');

export const msgSuccessfulLogin = () => toast.success('You are logged in!');

export const msgSuccessfulExited = () =>
    toast.success('You have successfully exited!');

export const msgSuccessfulEddedPost = () =>
    toast.success('The post has been added successfully!');

export const msgSuccessfulUodatedPost = () =>
    toast.success('The post has been updated successfully!');

    export const msgSuccessfulDeletedPost = () =>
        toast.success('Post deleted successfully!');
