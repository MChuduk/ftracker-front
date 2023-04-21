import React, { useState } from 'react';

const COLORS = [
  '#FF5C5C', '#FFBD4A', '#FFE34A', '#C0D860', '#7DC17F', '#5C8D89', '#4F6D7A', '#5D4E6D', '#B14B5D', '#E05C5D',
  '#D4AF9E', '#E4DCC8', '#CAD7B2', '#A2A79E', '#7A8A8F', '#D9D9D9', '#A8A8A8', '#7F7F7F', '#2F2F2F', '#FFA07A',
  '#FFE4C4', '#B0C4DE', '#C2DFFF', '#AFEEEE', '#F08080', '#FA8072', '#FFB6C1', '#CD5C5C', '#8B0000', '#FF4500',
];

const ColorSelector = ({ onSelected }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[12]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelected(color);
  };

  return (
      <div>
        <div>
          <label>Select color:</label>
        </div>
        {COLORS.map((color) => (
            <div
                key={color}
                style={{
                  backgroundColor: color,
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  margin: '5px',
                  cursor: 'pointer',
                  border: selectedColor === color ? '3px solid black' : 'none',
                }}
                onClick={() => handleColorClick(color)}
            />
        ))}
        <p>You selected: {selectedColor ? <span style={{ color: selectedColor }}>●</span> : 'nothing'}</p>
      </div>
  );
};

export default ColorSelector;
