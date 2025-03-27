import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Ahsan Malik',
    text: `This website revolutionizes real estate in Mithi! The property listings are well-organized, and the filter options make it incredibly easy to find exactly what I’m looking for. Highly recommend it to buyers and sellers alike.`,
    image: 'testimonials6',
  },
  {
    id: 2,
    name: 'Fatima Shaikh',
    text: `Finally, a transparent and reliable platform for real estate in Tharparkar. The user interface is clean, and the admin’s quick response to queries is commendable. Listing my property was seamless, and I received genuine leads in no time.`,
    image: 'testimonials7',
  },
  {
    id: 3,
    name: 'Muhammad Ali',
    text: `An exceptional platform for anyone interested in buying or renting properties in Mithi. The inclusion of services like document verification adds a layer of trust that’s hard to find elsewhere.`,
    image: 'testimonials8',
  },
  {
    id: 4,
    name: 'Sana Ahmed',
    text: `As a first-time homebuyer, I was impressed by how easy it was to navigate the site. The detailed property descriptions and images made my decision so much easier. Kudos to the team!`,
    image: 'testimonials9',
  },
  {
    id: 5,
    name: 'Imran Khan',
    text: `The admin panel is a great tool for sellers to manage their listings effectively. This platform has brought a much-needed digital transformation to the real estate market in Mithi.`,
    image: 'testimonials10',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, index]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className='testinomial-main'>
      <h2>What Our Clients Say</h2>
      <Carousel
        activeIndex={index}
        onSelect={(selectedIndex) => setIndex(selectedIndex)}
        className='testimonial-carousel'
      >
        {testimonials.map((testimonial) => (
          <Carousel.Item key={testimonial.id}>
            <div className='testimonial-item d-flex flex-column align-items-center text-center'>
              {/* <img
                className='testimonial-image'
                src={process.env.PUBLIC_URL + `/${testimonial.image}.png`}
                alt={testimonial.name}
              /> */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h5>{testimonial.name}</h5>
                <p>{testimonial.text}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
