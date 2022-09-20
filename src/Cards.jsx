import "./styles.css"
import { useEffect, useState } from "react";

const Cards = () => {

    const [cards, setCards] = useState([]);
    const [removed, setRemoved] = useState([]);

    useEffect(() => {
      const createPackOfCards = () => {
        let i = 1;
        let suit_index = 0;
        let suit_card_value = 1;

        let cards = [];
        while (i <= 52) {
          if (suit_card_value % 14 === 0) {
            suit_card_value = 1;
            suit_index++;
          }
          cards.push({ suit: suit_index, value: suit_card_value, id: i });
          suit_card_value++;
          i++;
        }
        return cards;
      };

      const cards = createPackOfCards();
      setCards(cards);
    }, []);

    const shuffle = () => {
      let shuffled = [];
      let usedCardIndexes = [];

      let i = 1;
      while (i <= cards.length) {
        // Math.random returns floating point number between 0 - 1
        // multiplying  0 by array.length will give, and 0.99 will give 52
        // becasue array is not zero based. wEcan just round the numbder rather than floor it
        let randomNumber = Math.floor(Math.random() * cards.length);
        if (!usedCardIndexes.includes(randomNumber)) {
          shuffled.push(cards[randomNumber]);
          usedCardIndexes.push(randomNumber);
          i++;
        }
      }
      setCards(shuffled);
    };

    const sortCards = () => {
      setCards((cards) =>
        cards.sort((a, b) => {
          a.value - b.value;
        })
      );
    };

    


    return (
      <section className="body">
        <div className="card" suit="heart">
          <div className="pip"></div>
          <div className="pip"></div>
          <div className="pip"></div>

          <div className="pip"></div>
        </div>

      </section>
    );
}

export default Cards;