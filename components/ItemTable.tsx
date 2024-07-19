import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const ItemTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
