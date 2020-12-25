import React from "react";

export default function ListMenu({ setItem, tittle, items, data }) {
  return (
    <div className="setting__row">
      <div className="setting__row__tittle">{tittle}</div>
      <div className="setting__row__container">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              onClick={(event) => {
                setItem(event.target, index);
              }}
              className={`setting__row__container__elem ${
                data === index ? "active" : " "
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
