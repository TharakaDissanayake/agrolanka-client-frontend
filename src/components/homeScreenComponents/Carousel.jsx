import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption, Button
} from 'reactstrap';

const items = [
  {
    id: 1,
    altText: 'Slide 1',
    caption: 'Slide 1',
    img: "/images/mango3.jpg"
  },
  {
    id: 2,
    altText: 'Rs.1000.00 ',
    caption: 'Best Banana',
    img: "/images/mango2.jpg"
  },
  {
    id: 3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    img: "/images/mango3.jpg"
  },
  {
    id: 4,
    altText: 'Slide 4',
    caption: 'Slide 4',
    img: "/images/mango4.jpg"
  },
  {
    id: 5,
    altText: 'Slide 5',
    caption: 'Slide 5',
    img: "/images/mango.jpg"
  },
  {
    id: 6,
    altText: 'Slide 6',
    caption: 'Slide 6',
    img: "/images/mango2.jpg"
  }


];

const CarouselComponent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  let x = <pre>hello machan
              <b>Rs.1000.00</b>
  </pre>;
  const slides = items.map((item) => {

    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <CarouselCaption className="text-danger" captionText={x} captionHeader={<Button>click</Button>} captionHeader={<Button>click</Button>} />
        <img src={item.img} alt="img" width="100%"></img>
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {
          `.custom-tag {
              width: 100%;
              height: 300px;
           
            }`
        }
      </style>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default CarouselComponent;