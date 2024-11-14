'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import searchIcon from '@public/assets/images/search.svg';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatBox = () => {
    const [prompt, setPrompt] = useState("");
    const [chats, setChats] = useState([]);
    const chatContainerRef = useRef(null); 
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`/api/prompt/${postId}`);
                const data = await response.json();
                setPrompt(data.prompt);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        if (postId) {
            fetchPostData();
        }
    }, [postId]);

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setChats(prevChats => [...prevChats, { text: prompt, sender: "user" }]);
        setPrompt("");

        try {
            const result = await model.generateContent(prompt);
            const formattedResponse = formatResponse(result.response.text());
            setChats(prevChats => [...prevChats, { text: formattedResponse, sender: "ai" }]);
        } catch (error) {
            console.error("Error generating response:", error);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const formatResponse = (text) => {
        return text
            .split('\n')
            .map(line => line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
            .map((line, index) => `<p key=${index}>${line}</p>`)
            .join('');
    };

    return (
        <div className='border-stone-200 rounded-lg border-2 p-4 backdrop-blur h-[70vh] md:h-[75vh] w-full'>
            <p className='text-center font-bold orange_gradient text-3xl'>EZ Chat</p>

            <div ref={chatContainerRef} className='border-stone-200 rounded-lg border-2 p-4 mt-4 backdrop-blur h-96 w-full overflow-y-auto'>
                <h1 className='prompt_card'>Greetings, Test your prompts here!</h1>
                <h1 className='prompt_card mt-2'>Or tell me how I can help!</h1>

                {chats.map((chat, index) => (
                    <div key={index} className='block clear-both'>
                        {chat.sender === "ai" ? (
                            <h1
                                className="prompt_card mt-2"
                                dangerouslySetInnerHTML={{ __html: chat.text }}
                            />
                        ) : (
                            <h1 className="prompt_card_sender float-right mt-2">{chat.text}</h1>
                        )}
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
