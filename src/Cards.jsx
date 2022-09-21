import "./styles.css"
import { useEffect, useState } from "react";

const suits = ["heart", "club", "diamond", "spade"]
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
          cards.push({ suit_index: suit_index, value: suit_card_value, id: i });
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

    function displayCards(card) {
        let value = card.value
        // if (value === 1) value = "A"
        // if (value === 11) value = "J"
        // if (value === 12) value = "Q"
        // if (value === 13) value = "K"
      
        let pips = []
        let valueAsNumder = parseInt(card.value)
        
        if (isNaN(value)) {
          console.log(value)
        } else {
            pips = new Array(valueAsNumder)
            
        }

        console.log(pips.map((pip) => <div className="pip"></div>));
        return (
          <div key={card.id} className="card" value={"10"} suit={suits[card.suit_index]}>
                {pips.map(pip => <div className="pip"></div>)}
                <div className="corner-number top">{value}</div>
                <div className="corner-number bottom">{value}</div>
          </div>
        );
    }

    console.log()
    

    


    return (
        <section className="body">
            {displayCards({ suit_index: 0, value: 10, id: 4 })}
        
      </section>
    );
}

export default Cards;