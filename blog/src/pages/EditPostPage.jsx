import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from '../utils/axios';
import { updateMyPost } from '../redux/features/post/postSlice';
import { msgSuccessfulUodatedPost } from '../utils/notification';

export const EditPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [newImage, setNewImage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setTitle(data.title);
        setText(data.text);
        setOldImage(data.imgUrl);
    }, [params.id]);

    const handleSubmit = () => {
        try {
            const data = new FormData();
            data.append('title', title);
            data.append('text', text);
            data.append('id', params.id);
            data.append('image', newImage);

            dispatch(updateMyPost(data));
            msgSuccessfulUodatedPost();
            navigate('/posts');
        } catch (error) {
            console.log(error.message);
        }
    };

    const clearFormData = () => {
        setText('');
        setTitle('');
    };

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={e => e.preventDefault()}
        >
            <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                Attach the sorbing:
                <input
                    type="file"
                    onChange={e => {
                        setNewImage(e.target.files[0]);
                        setOldImage('');
                    }}
                    className="hidden"
                />
            </label>

            <div className="flex object-cover py-2">
                {oldImage && (
                    <img
                        src={`http://localhost:3002/${oldImage}`}
                        alt={oldImage.name}
                    />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                    />
                )}
            </div>

            <label className="text-xs text-white opacity-70">
                Post title:
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>

            <label className="text-xs text-white opacity-70">
                The text of the post:
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="The text of the post"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
                ></textarea>
            </label>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex justify-center items-center bg-gray-600 w-1/3 text-xs  text-white rounded-md py-2 px-4"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={clearFormData}
                    className="flex justify-center items-center bg-red-500 w-1/3 text-xs text-white rounded-md py-2 px-4"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
