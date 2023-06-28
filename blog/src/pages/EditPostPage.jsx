import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from '../utils/axios';
import { updateMyPost } from '../redux/features/post/postSlice';
import { msgSuccessfulUodatedPost } from '../utils/notification';
import { postSchema } from '../Shared/validation/postSchema';
import { PostForm } from '../components/PostForm';

export const EditPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [newImage, setNewImage] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setTitle(data.title);
        setText(data.text);
        setOldImage(data.imgUrl);
    }, [params.id]);

    const handleSubmit = async () => {
        if (title.trim().length === 0 || text.trim().length === 0) {
            return setError('The fields title and text cannot be empty!');
        }
        const data = new FormData();
        data.append('title', title);
        data.append('text', text);
        data.append('id', params.id);
        data.append('image', newImage);
        try {
            await postSchema.validate({ title, text });
            await dispatch(updateMyPost(data));
            setError('');
            msgSuccessfulUodatedPost();
            navigate('/posts');
        } catch (error) {
            setError(error.message);
        }
    };

    const clearFormData = () => {
        setText('');
        setTitle('');
        setOldImage('');
        setNewImage('');
    };

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleFileChange = (e) => {
        setNewImage(e.target.files[0]);
        setOldImage('');
    };

    return (
        <PostForm
            handleFileChange={handleFileChange}
            clearFormData={clearFormData}
            handleSubmit={handleSubmit}
            oldImage={oldImage}
            newImage={newImage}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            error={error}
            buttonText={'Update'}
        />
    );
};
