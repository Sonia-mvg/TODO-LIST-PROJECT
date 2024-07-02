import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const TodoItem = props => {

  const {
    onChange,
    data: { id, tarea, done },
  } = props;

  const [imageUrl, setImageUrl] = useState("");

  const fetchImage = async () => {
    try {
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1"
      );
      const data = await response.json();
      if (data.length > 0) {
        setImageUrl(data[0].url);
      }
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);
   

  return (

    <div className="grid grid-cols-4 gap-4 items-center justify-center rounded-lg">
      <div className='flex justify-center items-center col-span-1'>
        <input
          className="form-checkbox"
          name={id}
          type="checkbox"
          defaultChecked={done}
          onChange={onChange}
        />
      </div>
      <div className='flex justify-center items-center col-span-1'>
        {imageUrl && <img src={imageUrl} alt="random NASA img" style={{ width: '40px', height: '40px' }} />}
      </div>
      <div className='flex justify-center items-center col-span-2'>
        {tarea}
      </div>
    </div>
    
  );
}

TodoItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tarea: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
