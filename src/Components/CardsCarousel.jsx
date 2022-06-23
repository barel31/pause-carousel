import React from 'react';
import Card from './Card';
import './CardsCarousel.scss';

import Carousel from 'react-bootstrap/Carousel';

export default function CardsCarousel({ cards }) {
    return (
        <div className='CardsCarousel'>
            <Carousel variant='dark' style={{ height: 450 }}>
                {cards.map((card, i) => (
                    <Carousel.Item key={i}>
                        <Card card={card} />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
