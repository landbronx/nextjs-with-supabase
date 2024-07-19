import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('items')
      .insert([{ name, description }]);

    if (error) {
      console.error(error);
    } else {
      console.log('Item added:', data);
    }

    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;