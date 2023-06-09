import React, { useCallback, useEffect, useState } from 'react';
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import axios from '../utils/axios';
import { removeMyPost } from '../redux/features/post/postSlice';
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice';
import { CommentItem } from '../components/CommentItem';
import { msgSuccessfulDeletedPost } from '../utils/notification';
import { IsLoading } from '../components/IsLoading';
import {Button} from '../components/Button';
import { getAuth, getComment } from '../redux/selectors';

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');

    const { user, isLoading } = useSelector(getAuth);
    const { comments } = useSelector(getComment);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const removePost = async () => {
        try {
            await dispatch(removeMyPost(params.id));
            msgSuccessfulDeletedPost();
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
        if (!user) {
            navigate('/login');
        }
        try {
            const postId = params.id;

            dispatch(createComment({ postId, comment }));
            setComment('');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id));
        } catch (error) {
            console.log(error.message);
        }
    }, [dispatch, params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <>
            {isLoading && <IsLoading />}
            <div className="max-w-[900px] mx-auto py-10">
                <Button
                    onClick={handleGoBack}
                    className="bg-gray-600 text-white rounded-lg py-2 px-4"
                >
                    Back
                </Button>

                {post && (
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
                                    <Moment
                                        date={post.createdAt}
                                        format="D MMM YYYY"
                                    />
                                </div>
                            </div>
                            <div className="text-white text-xl">
                                {post.title}
                            </div>
                            <p className="text-white opacity-60 text-xs pt-4">
                                {post.text}
                            </p>

                            <div className="flex gap-3 items-center mt-2 justify-between">
                                <div className="flex gap-3 mt-4">
                                    <Button className="gap-2 text-xs text-white opacity-50">
                                        <AiFillEye /> <span>{post.views}</span>
                                    </Button>
                                    <Button className="gap-2 text-xs text-white opacity-50">
                                        <AiOutlineMessage />{' '}
                                        <span>
                                            {post.comments?.length || 0}
                                        </span>
                                    </Button>
                                </div>
                                {user?._id === post.author && (
                                    <div className="flex gap-3 mt-4">
                                        <Button className="text-white opacity-50">
                                            <Link to={`/${params.id}/edit`}>
                                                <AiTwotoneEdit />
                                            </Link>
                                        </Button>
                                        <Button
                                            onClick={removePost}
                                            className="text-white opacity-50"
                                        >
                                            <AiFillDelete />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
                            <form
                                onSubmit={e => e.preventDefault()}
                                className="flex gap-2"
                            >
                                <DebounceInput
                                    minLength={1}
                                    debounceTimeout={300}
                                    type="text"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="Comment"
                                    className="text-black w-full rounded-lg bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                                />
                                {user ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={comment.trim().length === 0}
                                        className="text-xs text-white rounded-lg py-2 px-4 bg-gray-600"
                                    >
                                        Send
                                    </Button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-lg py-2 px-4"
                                    >
                                        Send
                                    </Link>
                                )}
                            </form>

                            {comments?.map(cmt => (
                                <CommentItem key={cmt._id} cmt={cmt} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
