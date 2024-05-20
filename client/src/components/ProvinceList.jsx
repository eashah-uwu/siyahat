import React, { useState } from 'react';
import ProvinceCard from './ProvinceCard';
import Modal from './Modal';
import './ProvinceList.css';

const provinces = [
    { name: 'Punjab', description: "Punjab is a province of Pakistan. Located in central-eastern region of the country, Punjab is the second-largest province of Pakistan by land area and the largest by population. Lahore is the capital and the largest city of the province. Other major cities include Faisalabad, Rawalpindi, Gujranwala and Multan. ", image: 'src/Images/punjab.jpg' },
    { name: 'Sindh', description: "Sindh is a province of Pakistan. Located in the southeastern region of the country, Sindh is the third-largest province of Pakistan by land area and the second-largest province by population after Punjab. It is bordered by the Pakistani provinces of Balochistan to the west and north-west and Punjab to the north.", image: 'src/Images/khi.jpg' },
    { name: 'Khyber Pakhtunkhwa', description: "Khyber Pakhtunkhwa, formerly known as North West Frontier Province, is a province of Pakistan. Located in the northwestern region of the country, Khyber Pakhtunkhwa is the fourth largest province of Pakistan by land area and the third-largest province by population.", image: 'src/Images/kpk.jpg' },
    { name: 'Balochistan', description: "Balochistan is a province of Pakistan. Located in the southwestern region of the country, Balochistan is the largest province of Pakistan by land area but is the least populated one.", image: 'src/Images/balochistan.jpg' },
];

const ProvinceList = () => {
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleCardClick = (province) => {
        setSelectedProvince(province);
    };

    const closeModal = () => {
        setSelectedProvince(null);
    };

    return (
        <div className="province-list">
            {provinces.map((province, index) => (
                <ProvinceCard
                    key={index}
                    {...province}
                    onClick={() => handleCardClick(province)}
                />
            ))}
            <Modal
                isOpen={!!selectedProvince}
                onClose={closeModal}
                province={selectedProvince}
            />
        </div>
    );
};

export default ProvinceList;
