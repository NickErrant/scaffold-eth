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

import ariSole from "../assets/ari/ari-sole.png";
import ariGuard from "../assets/ari/ari-guard.png";
import ariToeBox from "../assets/ari/ari-toebox.png";
import ariMidPanel from "../assets/ari/ari-midpanel.png";
import ariBackPanel from "../assets/ari/ari-backpanel.png";
import ariHeelTab from "../assets/ari/ari-heeltab.png";
import ariSymbol from "../assets/ari/ari-symbol.png";

import mcaSole from "../assets/mca/mca-sole.png";
import mcaGuard from "../assets/mca/mca-guard.png";
import mcaToeBox from "../assets/mca/mca-toebox.png";
import mcaMidPanel from "../assets/mca/mca-midpanel.png";
import mcaBackPanel from "../assets/mca/mca-backpanel.png";
import mcaHeelTab from "../assets/mca/mca-heeltab.png";
import mcaSymbol from "../assets/mca/mca-symbol.png";

import henderSole from "../assets/hender/hender-sole.png";
import henderGuard from "../assets/hender/hender-guard.png";
import henderToeBox from "../assets/hender/hender-toebox.png";
import henderMidPanel from "../assets/hender/hender-midpanel.png";
import henderBackPanel from "../assets/hender/hender-backpanel.png";
import henderHeelTab from "../assets/hender/hender-heeltab.png";




function PartPicker(props) {
  const partList = [
    { 
      type: "Sole",
      icon: sole,
      images: [shoeOneSole, ariSole, mcaSole, henderSole]
    },
    { 
      type: "Guard",
      icon: guard,
      images: [shoeOneGuard, ariGuard, mcaGuard, henderGuard]
    },
    { 
      type: "Toe Box",
      icon: toeBox,
      images: [shoeOneToeBox, ariToeBox, mcaToeBox , henderToeBox]
    },
    { 
      type: "Mid Panel",
      icon: midPanel,
      images: [shoeOneMidPanel, ariMidPanel, mcaMidPanel, henderMidPanel]
    },
    { 
      type: "Back Panel",
      icon: backPanel,
      images: [shoeOneBackPanel, ariBackPanel, mcaBackPanel, henderBackPanel]
    },
    { 
      type: "Heel Tab",
      icon: heelTab,
      images: [shoeOneHeelTab, ariHeelTab, mcaHeelTab, henderHeelTab]
    },
    { 
      type: "Symbol",
      icon: symbol,
      images: [shoeOneSymbol, ariSymbol, mcaSymbol, ""]
    },
  ]
  const variationList = [
    { 
      name: "Kanye West",
      price: "14.77 ETH ($26,975)"
    },
    { 
      name: "Menthol 10s",
      price: "14.77 ETH ($26,975)"
    },
    { 
      name: "MCA",
      price: "In Collection"
    },
    { 
      name: "Hender",
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
          <img className={`${currentPart == 0 ? "" : "partpicker__hidden"}`} src={partList[0].images[variationsSelcted[0]]}/>
          <img className={`${currentPart == 1 ? "" : "partpicker__hidden"}`} src={partList[1].images[variationsSelcted[1]]}/>
          <img className={`${currentPart == 2 ? "" : "partpicker__hidden"}`} src={partList[2].images[variationsSelcted[2]]}/>
          <img className={`${currentPart == 3 ? "" : "partpicker__hidden"}`} src={partList[3].images[variationsSelcted[3]]}/>
          <img className={`${currentPart == 4 ? "" : "partpicker__hidden"}`} src={partList[4].images[variationsSelcted[4]]}/>
          <img className={`${currentPart == 5 ? "" : "partpicker__hidden"}`} src={partList[5].images[variationsSelcted[5]]}/>
          <img className={`${currentPart == 6 ? "" : "partpicker__hidden"}`} src={partList[6].images[variationsSelcted[6]]}/>
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
          <img src={partList[currentPart].icon} />
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
