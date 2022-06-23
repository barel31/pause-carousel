import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
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
    exit: { x: offsetX > 0 ? -600 : 600, scale: 0, opacity: 0 },
});

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default function CardsCarousel({ cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offsetX, setoffsetX] = useState(0);
    const [cardVariantName, setCardVariantName] = useState('stop');

    // Get the previous and the prior cards
    const currentIndexPrevius = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    const currentIndexPrior = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;

    // Slide cards every 10 secs
    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentIndex(offsetX > 0 ? currentIndexPrevius : currentIndexPrior);
            startCardAnimation();
        }, 10000);

        // Clear The interval on unmount
        return () => clearInterval(sliderInterval);
    }, [currentIndex]);

    // Start animation on cards
    const startCardAnimation = () => {
        setCardVariantName('start');
        const animationTimeOut = setTimeout(() => {
            clearTimeout(animationTimeOut);
            setCardVariantName('stop');
        }, 100);
    };

    const moveCarousel = (cardIndex, x) => {
        setCurrentIndex(cardIndex);
        setoffsetX(x === offsetX ? x + 1 : x);
        startCardAnimation();
    };

    const bigScreen = useMediaQuery({ query: `(max-width: 1200px)` });

    return (
        <div className='CardsCarousel'>
            <motion.div
                className='cards'
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        moveCarousel(currentIndexPrior, bigScreen ? 300 : 400);
                    } else if (swipe > swipeConfidenceThreshold) {
                        moveCarousel(currentIndexPrevius, bigScreen ? -300 : -400);
                    }
                }}>
                <motion.div
                    className='prior-card'
                    variants={cardVariant(offsetX)}
                    animate={cardVariantName === 'start' ? 'prior' : 'stop'}
                    exit='exit'>
                    <Card card={cards[currentIndexPrior]} />
                </motion.div>

                <div className='active-card'>
                    <motion.div
                        variants={cardVariant(offsetX)}
                        animate={cardVariantName === 'start' ? 'active' : 'stopActive'}>
                        <Card card={cards[currentIndex]} />
                    </motion.div>
                </div>
                <motion.div
                    className='previous-card'
                    variants={cardVariant(offsetX)}
                    animate={cardVariantName === 'start' ? 'previous' : 'stop'}>
                    <Card card={cards[currentIndexPrevius]} />
                </motion.div>
            </motion.div>
            <div className='cards-btns'>
                <div onClick={() => moveCarousel(currentIndexPrior, bigScreen ? -300 : -400)}>
                    <HiChevronLeft />
                </div>
                <div onClick={() => moveCarousel(currentIndexPrevius, bigScreen ? 300 : 400)}>
                    <HiChevronRight />
                </div>
            </div>
        </div>
    );
}
