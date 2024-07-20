"use client";

import { useState } from 'react';
import { supabase } from '../utils/supabase/client';  // Adjusted path

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  // Specify the type for 'e'
    e.preventDefault();
    const { data, error } = await supabase
      .from('Klimatdata')
      .insert([{ name, description, price: parseFloat(price) }]);

    if (error) {
      console.error(error);
    } else {
      console.log('Item added:', data);
    }

    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary">Add Item</button>
    </form>
  );
};

export default AddItemForm;
