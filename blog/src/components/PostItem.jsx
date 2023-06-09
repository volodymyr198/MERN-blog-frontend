import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IsLoading } from './IsLoading';
import { Button } from './Button';
import { getAuth } from '../redux/selectors';

export const PostItem = ({ post }) => {
    const { isLoading } = useSelector(getAuth);

    return (
        <>
            {isLoading && <IsLoading />}
            {post && (
                <Link to={`/${post._id}`}>
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
                        <div className="text-white text-xl">{post.title}</div>
                        <p className="text-white opacity-60 text-xs pt-4">
                            {post.text}
                        </p>

                        <div className="flex gap-3 items-center mt-2">
                            <Button className="gap-2 text-xs text-white opacity-50">
                                <AiFillEye /> <span>{post.views}</span>
                            </Button>
                            <Button className="gap-2 text-xs text-white opacity-50">
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0}</span>
                            </Button>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};
