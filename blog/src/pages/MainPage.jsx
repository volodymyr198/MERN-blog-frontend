import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostItem } from '../components/PostItem';
import { PopularPosts } from '../components/PopularPosts';
import { getAllPosts } from '../redux/features/post/postSlice';
import { IsLoading } from '../components/IsLoading';
import { getAuth, getPost } from '../redux/selectors';

export const MainPage = () => {
    const { isLoading } = useSelector(getAuth);
    const { posts, popularPosts } = useSelector(getPost);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <>
            {isLoading && <IsLoading />}
            {posts.length && (
                <div className="max-w-[800px] mx-auto py-10">
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-10 basis-4/5">
                            {posts?.map((post, idx) => (
                                <PostItem key={idx} post={post} />
                            ))}
                        </div>
                        <div className="basis-1/5">
                            <div className="text-xs uppercase text-white">
                                Popular
                            </div>

                            {popularPosts?.map((post, idx) => (
                                <PopularPosts key={idx} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
