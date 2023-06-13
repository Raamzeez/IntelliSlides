import React from "react";

import CryptoCard from "./ViewCard";
import "../styles/ViewList.module.css"

const CryptoList = ({ coinsData }) => {
    return (
        <div className='crypto_list'>
            {coinsData.map((coin, index) => {
                return (
                    <CryptoCard
                        key={index}
                        image={coin.image}
                        name={coin.name}
                        price={coin.current_price}
                    />
                );
            })}
        </div>
    );
};

export default CryptoList;