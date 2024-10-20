import React, { useState, useRef } from 'react';
import YouTubePlayer from './react-video-player';

export default function VideoPlayer() {
    const [videoUrl, setVideoUrl] = useState('');

    // Function to extract the video ID from the YouTube link
    function getYouTubeVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1];
        } else {
            throw new Error("Invalid YouTube video URL");
        }
    }



    const [videoId, setvideoId] = useState("")






    // Handle input change and save the input value in the state
    const handleInputChange = (e) => {
        setVideoUrl(e.target.value);
    };

    // Handle Play button click
    const handlePlayClick = () => {
        try {
            setvideoId(getYouTubeVideoId(videoUrl))
            // You can pass videoID to the YouTubePlayer here
        } catch (error) {
            alert("The link is not valid.");
            console.warn(error);
        }
    };

    return (
        <div className='h-[90%] flex flex-col w-full items-center'>
            <div className='w-full h-[3vw] flex justify-center items-center border-b-2 rounded-md mb-[1vw] font-Moderustic'>Video Player</div>

            <YouTubePlayer videoId={videoId} />

            <div className='mt-[5%] w-[70%] shadow-md h-[5vh]'>
                <input
                    type="text"
                    className='w-[80%] h-[100%] rounded-xl p-[0.5vw] outline-none'
                    placeholder='Paste your video link here'
                    onChange={handleInputChange}  // Update state on change
                />
                <input
                    type="button"
                    value="Play"
                    className='w-[20%] bg-[#4AA8FF] text-white h-[100%] rounded-xl cursor-pointer'
                    onClick={handlePlayClick}  // Handle Play button click
                />
            </div>

            <p className='text-center text-[1vw] w-[80%] text-gray-500 mt-[2vh]'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
        </div>
    );
}
