/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import "../styles/partpicker.css";
import sole from "../assets/shoe-icons/sole.svg";
import guard from "../assets/shoe-icons/guard.svg";
import toeBox from "../assets/shoe-icons/toe-box.svg";
import midPanel from "../assets/shoe-icons/mid-panel.svg";
import backPanel from "../assets/shoe-icons/back-panel.svg";
import heelTab from "../assets/shoe-icons/heel-tab.svg";
import symbol from "../assets/shoe-icons/symbol.svg";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import shoeBig from "../assets/shoe-big.png";

import shoeOneSole from "../assets/shoe1/shoe1-sole.png";
import shoeOneGuard from "../assets/shoe1/shoe1-guard.png";
import shoeOneToeBox from "../assets/shoe1/shoe1-toebox.png";
import shoeOneMidPanel from "../assets/shoe1/shoe1-midpanel.png";
import shoeOneBackPanel from "../assets/shoe1/shoe1-backpanel.png";
import shoeOneHeelTab from "../assets/shoe1/shoe1-heeltab.png";
import shoeOneSymbol from "../assets/shoe1/shoe1-symbol.png";




function PartPicker(props) {
  const partList = [
    { 
      type: "Sole",
      image: sole
    },
    { 
      type: "Guard",
      image: guard
    },
    { 
      type: "Toe Box",
      image: toeBox
    },
    { 
      type: "Mid Panel",
      image: midPanel
    },
    { 
      type: "Back Panel",
      image: backPanel
    },
    { 
      type: "Heel Tab",
      image: heelTab
    },
    { 
      type: "Symbol",
      image: symbol
    },
  ]
  const variationList = [
    { 
      name: "Kanye West",
      price: "14.77 ETH ($26,975)"
    },
    { 
      name: "UNC",
      price: "In Collection"
    },
    { 
      name: "Camo",
      price: "14.77 ETH ($26,975)"
    },
    { 
      name: "Volt Green",
      price: "14.77 ETH ($26,975)"
    },
  ]
  const [currentPart, setCurrentPart] = useState(0)
  const [variationsSelcted, setVariationsSelcted] = useState([0,0,0,0,0,0,0])

  function changePart(direction) {
    let newIndex = currentPart;
    if (direction == 'next') {
      newIndex = newIndex + 1;
      if (newIndex > 6) {
        newIndex = 0;
      }
    } else {
      newIndex = newIndex - 1;
      if (newIndex < 0) {
        newIndex = 6;
      }
    }
    setCurrentPart(newIndex);
  }

  function chooseVariation(index) {
    let newVariations = variationsSelcted;
    newVariations[currentPart] = index;
    setVariationsSelcted(newVariations);
  }

  return (
    <div className="partpicker">
      <div className="partpicker__hero">
        <div className="partpicker__title">
          Every Thing's A Remix
        </div>
        <div className="partpicker__shoe">
          {/*<img src={shoeBig}/>*/}
          <img className={`${currentPart == 0 ? "" : "partpicker__hidden"}`} src={shoeOneSole}/>
          <img className={`${currentPart == 1 ? "" : "partpicker__hidden"}`} src={shoeOneGuard}/>
          <img className={`${currentPart == 2 ? "" : "partpicker__hidden"}`} src={shoeOneToeBox}/>
          <img className={`${currentPart == 3 ? "" : "partpicker__hidden"}`} src={shoeOneMidPanel}/>
          <img className={`${currentPart == 4 ? "" : "partpicker__hidden"}`} src={shoeOneBackPanel}/>
          <img className={`${currentPart == 5 ? "" : "partpicker__hidden"}`} src={shoeOneHeelTab}/>
          <img className={`${currentPart == 6 ? "" : "partpicker__hidden"}`} src={shoeOneSymbol}/>
        </div>
        <div className="construct">
          <div className="construct__price">
            <span>Total price:</span> 24.39 ETH ($52,345)
          </div>
          <div className="construct__button">
            CONSTRUCT
          </div>
        </div>
      </div>
      <div className="parts">
        <img className="parts__arrow" src={arrowLeft} onClick={() => changePart('prev')}/>
        <div className="part">
          <div className="part__type">{partList[currentPart].type}</div>
          <img src={partList[currentPart].image} />
        </div>
        <img className="parts__arrow" src={arrowRight} onClick={() => changePart('next')}/>
      </div>
      <div className="variations">
        {variationList.map((variation, index) => 
          <div className={`variation ${index == variationsSelcted[currentPart] ? "variation--selected" : ""}`} onClick={() => chooseVariation(index)}>
            <div className="variation__name">{variation.name}</div>
            <div className={`variation__price ${variation.price == "In Collection" ? "variation__price--collection" : ""}`}>{variation.price}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartPicker;
