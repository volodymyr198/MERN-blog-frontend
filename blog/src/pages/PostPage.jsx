import React, { useCallback, useEffect, useState } from 'react';
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../utils/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeMyPost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify';
import { createComment } from '../redux/features/comment/commentSlice';

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');

    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const removePost = () => {
        try {
            dispatch(removeMyPost(params.id));
            toast('Post deleted successfully');
            navigate('/posts');
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    const handleSubmit = () => {
        try {
            const postId = params.id;
            console.log(comment);
            dispatch(createComment({ postId, comment }));
            setComment('');
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto py-10">
            <button className="flex justify-center items-center bg-gray-600 text-white rounded-lg py-2 px-4">
                <Link className="flex" to={'/'}>
                    Back
                </Link>
            </button>

            <div className="flex gap-10 py-8">
                <div className="flex flex-col basis-1/4 flex-grow">
                    <div
                        className={
                            post.imgUrl
                                ? 'flex rounded-sm h-80'
                                : 'flex rounded-sm'
                        }
                    >
                        {post.imgUrl && (
                            <img
                                src={`http://localhost:3002/${post.imgUrl}`}
                                alt="img"
                                className="w-full object-cover"
                            />
                        )}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-white opacity-50">
                            {post.username}
                        </div>
                        <div className="text-xs text-white opacity-50">
                            <Moment date={post.createdAt} format="D MMM YYYY" />
                        </div>
                    </div>
                    <div className="text-white text-xl">{post.title}</div>
                    <p className="text-white opacity-60 text-xs pt-4">
                        {post.text}
                    </p>

                    <div className="flex gap-3 items-center mt-2 justify-between">
                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0}</span>
                            </button>
                        </div>
                        {user?._id === post.author && (
                            <div className="flex gap-3 mt-4">
                                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePost}
                                    className="flex items-center justify-center gap-2 text-white opacity-50"
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Comment"
                            className="text-black w-full rounded-lg bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                        />
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-lg py-2 px-4"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
