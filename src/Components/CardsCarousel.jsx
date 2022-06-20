import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Card from './Card';
import './CardsCarousel.scss';

// import { ReactComponent as CardWaveBG } from '../svg/card-wave-bg.svg';

export default function CardsCarousel({ cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [xDirection, setXDirection] = useState(400);
    const [cardVariantName, setCardVariantName] = useState('stop');

    // Get the previous and the prior cards
    const currentIndexPrevius = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    const currentIndexPrior = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;

    // Slide cards every 10 secs
    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentIndex(currentIndexPrior);
            startCardAnimation();
        }, 10000);

        // Clear The interval on unmount
        return () => clearInterval(sliderInterval);
    }, [currentIndexPrior]);

    // Start animation on cards
    const startCardAnimation = () => {
        setCardVariantName('start');
        const animationTimeOut = setTimeout(() => {
            clearTimeout(animationTimeOut);
            setCardVariantName('stop');
        }, 100);
    };

    // Decalare variants for cards animation
    const cardVariant = {
        previous: {
            x: [xDirection, 0],
            scale: [xDirection > 0 ? 0.4 : 1, 0.8],
            opacity: [xDirection > 0 ? 0.1 : 1, 0.6],
            transition: { duration: 0.3 },
        },
        prior: {
            x: [xDirection, 0],
            scale: [xDirection < 0 ? 0.4 : 1, 0.8],
            opacity: [xDirection < 0 ? 0.1 : 1, 0.6],
            transition: { duration: 0.3 },
        },
        active: {
            x: [xDirection, 0],
            scale: [0.8, 1],
            opacity: [0.6, 1],
            transition: { duration: 0.3 },
        },
        active2: {
            x: 0,
            scale: 1,
            opacity: 1,
        },
        stop: { x: 0, scale: 0.8, opacity: 0.6 },
    };

    return (
        <div className='CardsCarousel'>
            <div className='cards'>
                <motion.div
                    className='prior-card'
                    variants={cardVariant}
                    animate={cardVariantName === 'start' ? 'prior' : 'stop'}>
                    <Card card={cards[currentIndexPrior]} />
                </motion.div>
                <div className='active-card'>
                    <motion.div variants={cardVariant} animate={cardVariantName === 'start' ? 'active' : 'active2'}>
                        <Card card={cards[currentIndex]} />
                    </motion.div>
                </div>
                <motion.div
                    className='previous-card'
                    variants={cardVariant}
                    animate={cardVariantName === 'start' ? 'previous' : 'stop'}>
                    <Card card={cards[currentIndexPrevius]} />
                </motion.div>
            </div>
            <div className='cards-btns'>
                <div
                    onClick={() => {
                        setCurrentIndex(currentIndexPrevius);
                        setXDirection(xDirection === 400 ? 401 : 400);
                        startCardAnimation();
                    }}>
                    <HiChevronLeft />
                </div>
                <div
                    onClick={() => {
                        setCurrentIndex(currentIndexPrior);
                        setXDirection(xDirection === -400 ? -401 : -400);
                        startCardAnimation();
                    }}>
                    <HiChevronRight />
                </div>
            </div>
        </div>
    );
}