import { useState, FormEvent } from 'react';
import { createClient } from '../utils/supabase/server';  // Adjusted path

const supabase = createClient();

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: FormEvent) => {  // Specify the type for 'e'
    e.preventDefault();
    const { data, error } = await supabase
      .from('items')
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
