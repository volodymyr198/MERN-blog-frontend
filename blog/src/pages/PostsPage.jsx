import React, { useState, useEffect, useCallback } from 'react';

import axios from '../utils/axios';
import { PostItem } from '../components/PostItem';
import { IsLoading } from '../components/IsLoading';

export const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMyPosts = useCallback(async () => {
        try {
            const { data } = await axios.get('/posts/user/me');
            setPosts(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyPosts();
    }, [fetchMyPosts]);

    return (
        <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
            {isLoading ? (<IsLoading />
            ) : posts.length > 0 ? (
                posts.map((post, idx) => <PostItem post={post} key={idx} />)
            ) : (
                <div className="text-xl text-center text-white py-10">
                    No posts have been created yet :(
                </div>
            )}
        </div>
    );
};
