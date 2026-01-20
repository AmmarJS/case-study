import "./Card.css";

function Card({ image }: { image: string }) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
}

export default Card;
