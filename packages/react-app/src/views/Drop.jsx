/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import "../styles/drop.css";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import shoeBig from "../assets/shoe-big.png";
import dropBg from "../assets/drop-bg.svg";

function Drop({ tx, readContracts, writeContracts }) {
  const [currentPart, setCurrentPart] = useState(0)
  const [variationsSelcted, setVariationsSelcted] = useState([0,0,0,0,0,0,0])
  const [entered, setEntered] = useState(false)

  return (
    <div className="drop">
      <div className="drop__title">
        Every Thing's A Remix
      </div>
      <div className="drop__container">
        <div className="drop__left">
          <div className="drop__number">
            Drop #1
          </div>
          <div className="drop__name">
            "Kanye West"
          </div>
          <div className="drop__price">
            150 DAI ($145)
            <span>Entry fee</span>
          </div>
          <div className="drop__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="drop__button" onClick={()=>{
            if (entered) { return }
            /* look how you call setPurpose on your contract: */
            tx( writeContracts.StakeRaffle.stake(0), { to: readContracts.RemixableNFT.raffle });
            setEntered(true)
          }}>
            { entered ? "Waiting Drop..." : "Enter Drop" }
          </div>
        </div>
        <div className="drop__right">
          <div className="drop__image">
            <img className="drop__bg" src={dropBg}/>
            <img src={shoeBig}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drop;
