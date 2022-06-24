import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Card from './Card';
import './CardsCarousel.scss';

// Decalare variants for cards animation
const cardVariant = (offsetX) => ({
    previous: {
        x: [offsetX, 0],
        scale: [offsetX > 0 ? 0.4 : 1, 0.8],
        opacity: [offsetX > 0 ? 0.1 : 1, 0.6],
        transition: { duration: 0.4 },
    },
    prior: {
        x: [offsetX, 0],
        scale: [offsetX < 0 ? 0.4 : 1, 0.8],
        opacity: [offsetX < 0 ? 0.1 : 1, 0.6],
        transition: { duration: 0.4 },
    },
    active: {
        x: [offsetX, 0],
        scale: [0.8, 1],
        opacity: [0.6, 1],
        transition: { duration: 0.4 },
    },
    stopActive: {
        x: 0,
        scale: 1,
        opacity: 1,
    },
    stop: { x: 0, scale: 0.8, opacity: 0.6 },
});

// Taken from framer-motion docs
const swipeConfidenceThreshold = 2500;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default function CardsCarousel({ cards }) {
    const smallScreen = useMediaQuery({ query: `(max-width: 1200px)` });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [offsetX, setOffsetX] = useState(smallScreen ? 300 : 400);
    const [cardAnimateName, setCardAnimateName] = useState('stop');

    // Get the previous and the prior cards
    const currentIndexPrevious = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    const currentIndexPrior = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;

    useEffect(() => {
        // Slide cards every 10 secs
        const sliderInterval = setInterval(() => {
            moveCarousel(offsetX > 0 ? currentIndexPrevious : currentIndexPrior, offsetX > 0 ? 'right' : 'left');
        }, 10000);

        // clear The interval on unmount
        return () => clearInterval(sliderInterval);
    }, [currentIndex]);

    // Move carousel with animation
    const moveCarousel = (cardIndex, direction) => {
        const x = smallScreen ? -300 : -400;

        setCurrentIndex(cardIndex);
        setOffsetX(direction === 'left' ? x : Math.abs(x));
        startCardAnimation();
    };

    // Start carousel animation
    const startCardAnimation = () => {
        setCardAnimateName('start');
        const animationTimeOut = setTimeout(() => {
            clearTimeout(animationTimeOut);
            setCardAnimateName('stop');
        }, 100);
    };

    return (
        <div className='CardsCarousel'>
            <motion.div
                className='cards'
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, { offset, velocity }) => {
                    /* Taken from framer-motion docs */
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        moveCarousel(currentIndexPrevious, 'right');
                    } else if (swipe > swipeConfidenceThreshold) {
                        moveCarousel(currentIndexPrior, 'left');
                    }
                }}>
                {/* Render prior card */}
                <motion.div
                    className='prior-card'
                    variants={cardVariant(offsetX)}
                    animate={cardAnimateName === 'start' ? 'prior' : 'stop'}
                    onClick={() => moveCarousel(currentIndexPrior, 'left')}>
                    <Card card={cards[currentIndexPrior]} />
                </motion.div>
                {/* Render active card */}
                <motion.div
                    variants={cardVariant(offsetX)}
                    animate={cardAnimateName === 'start' ? 'active' : 'stopActive'}>
                    <Card card={cards[currentIndex]} />
                </motion.div>
                {/* Render previous card */}
                <motion.div
                    className='previous-card'
                    variants={cardVariant(offsetX)}
                    animate={cardAnimateName === 'start' ? 'previous' : 'stop'}
                    onClick={() => moveCarousel(currentIndexPrevious, 'right')}>
                    <Card card={cards[currentIndexPrevious]} />
                </motion.div>
            </motion.div>
            <div className='cards-btns'>
                <div onClick={() => moveCarousel(currentIndexPrior, 'left')}>
                    <HiChevronLeft />
                </div>
                <div onClick={() => moveCarousel(currentIndexPrevious, 'right')}>
                    <HiChevronRight />
                </div>
            </div>
        </div>
    );
}
