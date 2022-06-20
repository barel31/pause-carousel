import React from 'react';
import './App.scss';

import NavBar from './Components/NavBar';
import CardsCarousel from './Components/CardsCarousel';

import { images } from './images';

// cards array
const cards = [
    {
        content: 'I use PAUSE for the last three months and I found myself more productive than ever.',
        from: 'Bar Levi',
        about: 'Freelance Programmer',
        img: images.ProfileBarLevi,
        bgNumber: 0,
    },
    {
        content:
            'At first I was worried about the access to camera thing, I read the terms of privacy and heard recommendations from friends so I decided to try the free trial. Since I find myself much more energetic and efficient, highly recommend!.',
        from: 'Melanie Cruise',
        about: 'Engineering Student, MIT',
        img: images.ProfileMelanieCruise,
        bgNumber: 1,
    },
    {
        content:
            'Since I use pause I feel more alert, I did not know the importance of microbreak and how it can change my work day. The reports have also helped me understand when I am more productive.',
        from: 'Tom Yorke',
        about: 'Communication Student, Harvard',
        img: images.ProfileTomYorke,
        bgNumber: 2,
    },
    {
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut diam quam nulla porttitor. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.',
        from: 'Lorem Ipsum',
        about: 'Humus Chips Salad',
        img: 'https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg',
        bgNumber: 0,
    },
    {
        content:
            'Mauris cursus mattis molestie a iaculis. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse.',
        from: 'Henry Pushbutton',
        about: 'Button Pro Press',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        bgNumber: 1,
    },
    {
        content: 'Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus.',
        from: 'Hipi Hipo',
        about: 'Illusion Bakery Inc',
        img: 'https://qph.cf2.quoracdn.net/main-qimg-4b400f8e35a79a82babb0c145b317be7-lq',
        bgNumber: 2,
    },
];

export default function App() {
    return (
        <div className='App'>
            <NavBar />
            <div className='content'>
                <h1 className='title'>User Reviews</h1>
                <p className='p-text'>
                    We can talk and talk... but what really matters is <span>your opinion</span> of PAUSE
                </p>
                <div className='cards'>
                    <CardsCarousel cards={cards} />
                </div>
            </div>
        </div>
    );
}
