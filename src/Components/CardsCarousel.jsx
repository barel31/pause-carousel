import React, { useEffect, useState, useRef } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Card from './Card';
import './CardsCarousel.scss';

export default function CardsCarousel({ cards }) {
    const [width, setWidth] = useState(0);

    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    const moveCarousel = (back = false) => {
        
    };

    return (
        <div className='CardsCarousel'>
            <motion.div className='carousel'>
                <motion.div
                    className='carousel-inner'
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    ref={carousel}
                    whileTap={{ cursor: 'grabbing' }}>
                    {cards.map((card, i) => (
                        <motion.div key={i} className='carousel-inner-item'>
                            <Card card={card} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            <div className='cards-btns'>
                <div onClick={() => moveCarousel()}>
                    <HiChevronLeft />
                </div>
                <div onClick={() => moveCarousel(true)}>
                    <HiChevronRight />
                </div>
            </div>
        </div>
    );
}
