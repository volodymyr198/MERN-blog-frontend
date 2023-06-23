import * as Yup from 'yup';

export const registerLoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .max(16, 'The password must contain no more than 16 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            'Password must contain at least one lowercase letter, one uppercase letter, and one digit'
        ),
});