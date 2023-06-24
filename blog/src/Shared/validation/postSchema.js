import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
    title: Yup.string().required('Post title is required'),
    text: Yup.string().required('Post text is required'),
});
