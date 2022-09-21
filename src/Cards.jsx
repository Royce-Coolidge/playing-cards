import "./styles.css";
import { useEffect, useState } from "react";

const suits = ["heart", "club", "diamond", "spade"];
const Cards = () => {
  const [cards, setCards] = useState([]);

  const [sortType, setSortType] = useState("ascending");

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
    let sorted;
    if (sortType === "ascending") {
      sorted = [...cards].sort((a, b) => {
        return a.value - b.value;
      });
    }
    if (sortType === "descending") {
      sorted = [...cards].sort((a, b) => {
        return b.value - a.value;
      });
    }
    if (sortType === "suit") {
      sorted = [...cards].sort((a, b) => {
        return a.suit_index - b.suit_index;
      });
    }

    setCards(sorted);
  };

  const removeCard = (id) => {
    setCards((cards) => [...cards.filter((x) => x.id !== id)]);
  };

  const displayCards = (card) => {
    let pips = [];
    let value;
    switch (card.value) {
      case 1:
        value = "A";
        break;
      case 11:
        value = "J";
        break;
      case 12:
        value = "Q";
        break;
      case 13:
        value = "K";
        break;
      default:
        value = card.value;
    }
    let valueAsNumber = parseInt(value);
    if (isNaN(valueAsNumber)) {
      pips = new Array(1).fill(1);
    }
    pips = new Array(value).fill(value);

    return (
      <div
        id={card.id}
        key={card.id}
        className="card"
        value={value}
        suit={suits[card.suit_index]}
        onClick={() => removeCard(card.id)}
      >
        {pips.map((pip) => (
          <div className="pip"></div>
        ))}
        <div className="corner-number top">{value}</div>
        <div className="corner-number bottom">{value}</div>
      </div>
    );
  };

  return (
    <>
      <section className="board">
        {cards.map((card) => displayCards(card))}
      </section>
      <section className="dealer">
        <div>Click on card to remove it from the pack</div>
        <button onClick={shuffle}>Shuffle</button>
        <div>
          <fieldset>
            <legend>Sort By</legend>
            <div>
              <input
                id="suit"
                type="radio"
                name="suit"
                value="suit"
                checked={sortType === "suit"}
                onChange={() => setSortType("suit")}
              />
              <label htmlFor="suit">Suit</label>
            </div>
            <div>
              <input
                id="ascending"
                type="radio"
                name="ascending"
                value="ascending"
                checked={sortType === "ascending"}
                onChange={() => setSortType("ascending")}
              />
              <label htmlFor="ascending">Ascending (Low to High)</label>
            </div>
            <div>
              <input
                id="ascending"
                type="radio"
                name="descending"
                value="descending"
                checked={sortType === "descending"}
                onChange={() => setSortType("descending")}
              />
              <label htmlFor="descending">Descending (High to Low)</label>
            </div>
            <button onClick={sortCards}>Sort</button>
          </fieldset>
        </div>
      </section>
    </>
  );
};

export default Cards;
