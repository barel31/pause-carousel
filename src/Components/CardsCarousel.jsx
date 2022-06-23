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

export default function CardsCarousel({ cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offsetX, setoffsetX] = useState(0);
    const [cardVariantName, setCardVariantName] = useState('stopActive');

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
            <motion.div className='cards' drag='x'>
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className='active-card'
                        variants={cardVariant(offsetX)}
                        animate={cardVariantName}>
                        <Card card={card} />
                    </motion.div>
                ))}
            </motion.div>
            {/* <motion.div
                    className='prior-card'
                    variants={cardVariant(offsetX)}
                    animate={cardVariantName === 'start' ? 'prior' : 'stop'}>
                    <Card card={cards[currentIndexPrior]} />
                </motion.div>
                <div className='active-card'>
                    <motion.div variants={cardVariant(offsetX)} animate={cardVariantName === 'start' ? 'active' : 'stopActive'}>
                        <Card card={cards[currentIndex]} />
                    </motion.div>
                </div>
                <motion.div
                    className='previous-card'
                    variants={cardVariant(offsetX)}
                    animate={cardVariantName === 'start' ? 'previous' : 'stop'}>
                    <Card card={cards[currentIndexPrevius]} />
                </motion.div>
            </div> */}
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
