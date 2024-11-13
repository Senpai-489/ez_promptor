'use client';

import React, { useState } from 'react';
import searchIcon from '@public/assets/images/search.svg';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatBox = () => {
    const [prompt, setPrompt] = useState("");
    const [chats, setChats] = useState([]);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setChats(prevChats => [...prevChats, prompt]);
        setPrompt("");

        try {
            const result = await model.generateContent(prompt);
            setChats(prevChats => [...prevChats, result.response.text()]);
        } catch (error) {
            console.error("Error generating response:", error);
        }
    };

    return (
        <div className='border-stone-200 rounded-lg border-2 p-4 backdrop-blur h-[65vh] md:h-[75vh] w-full'>
            <p className='text-center font-bold orange_gradient text-3xl'>EZ Chat</p>

            <div className='border-stone-200 rounded-lg border-2 p-4 mt-4 backdrop-blur h-96 w-full overflow-y-auto'>
                <h1 className='prompt_card'>Greetings, Test your prompts here!</h1>
                <h1 className='prompt_card mt-2'>Or tell me how I can help!</h1>

                {/* Render each chat entry with clear separation */}
                {chats.map((chat, index) => (
                    <div key={index} className='block clear-both'>
                        {index % 2 !== 0 ? (
                            <h1 className="prompt_card mt-2">{chat}</h1>
                        ) : (
                            <h1 className="prompt_card_sender float-right mt-2">{chat}</h1>
                        )}
                        {/* Clear the float to ensure messages are stacked */}
                        <div className="clear-both"></div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className='relative w-full top-4 flex-center'>
                <input
                    type='text'
                    placeholder='Type a Prompt'
                    value={prompt}
                    onChange={handlePromptChange}
                    required
                    className='search_input peer flex-grow'
                />
                <button type="submit" className="ml-2 bg-white rounded-lg drop-shadow-lg p-2">
                    <Image src={searchIcon} alt="Search" className='w-8 h-8'/>
                </button>
            </form>
        </div>
    );
};

export default ChatBox;
