import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';

export const AuthForm = ({
    title,
    username,
    password,
    setUsername,
    setPassword,
    error,
    handleSubmit,
    buttonText,
    secondaryText,
    secondaryLink,
}) => {
    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="w-1/4 h-60 mx-auto mt-40"
        >
            <h1 className="text-lg text-white text-center">{title}</h1>
            <label className="text-xs text-gray-400">
                Username:
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    className="mt-1 text-black w-full rounded-lg bg-gray400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>
            <label className="text-xs text-gray-400">
                Password:
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mt-1 text-black w-full rounded-lg bg-gray400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <div className="flex gap-8 justify-center mt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center text-xs bg-gray-600 text-white rounded-lg py-2 px-4"
                >
                    {buttonText}
                </button>
                <Link
                    to={secondaryLink}
                    className="flex justify-center items-center text-xs text-white"
                >
                    {secondaryText}
                </Link>
            </div>
        </form>
    );
};
