import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { msgSuccessfulEddedPost } from '../utils/notification';
import { createPost } from '../redux/features/post/postSlice';
import { PostForm } from '../components/PostForm';

export const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (title.trim().length === 0 || text.trim().length === 0) {
            return setError('The fields title and text cannot be empty!');
        }
        const data = new FormData();
        data.append('title', title);
        data.append('text', text);
        data.append('image', image);
        try {
            await dispatch(createPost(data));
            msgSuccessfulEddedPost();
            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    };
    const clearFormData = () => {
        setText('');
        setTitle('');
        setImage('');
    };
    const handleFileChange = e => {
        setImage(e.target.files[0]);
    };

    return (
        <PostForm
            handleFileChange={handleFileChange}
            clearFormData={clearFormData}
            handleSubmit={handleSubmit}
            image={image}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            error={error}
            buttonText={"Add"}
        />
    );
};
