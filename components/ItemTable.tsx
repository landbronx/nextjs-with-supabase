import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/client';  // Adjusted path

interface KlimatdataItem {
  id: number;
  created_at: string;
  Namn: string;
  A1_A5: number;
  ByggElement: string;
}

const ItemTable = () => {
  const [items, setItems] = useState<KlimatdataItem[]>([]);  // Use the defined KlimatdataItem type

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('Klimatdata')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setItems(data as KlimatdataItem[]);  // Type the fetched data
      }
    };

    fetchItems();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created At</th>
          <th>Name</th>
          <th>A1-A5</th>
          <th>Building Element</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.created_at}</td>
            <td>{item.Namn}</td>
            <td>{item.A1_A5}</td>
            <td>{item.ByggElement}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
