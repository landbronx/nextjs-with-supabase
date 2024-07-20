"use client";

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
  const [items, setItems] = useState<KlimatdataItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('Klimatdata')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setItems(data as KlimatdataItem[]);
      }
    };

    fetchItems();
  }, []);

  const handleChange = (id: number, field: string, value: any) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleBlur = async (id: number, field: string, value: any) => {
    const { error } = await supabase
      .from('Klimatdata')
      .update({ [field]: value })
      .eq('id', id);

    if (error) {
      console.error(error);
    }
  };

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
            <td>
              <input
                type="text"
                value={item.Namn}
                onChange={(e) => handleChange(item.id, 'Namn', e.target.value)}
                onBlur={(e) => handleBlur(item.id, 'Namn', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={item.A1_A5}
                onChange={(e) => handleChange(item.id, 'A1_A5', e.target.value)}
                onBlur={(e) => handleBlur(item.id, 'A1_A5', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={item.ByggElement}
                onChange={(e) => handleChange(item.id, 'ByggElement', e.target.value)}
                onBlur={(e) => handleBlur(item.id, 'ByggElement', e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
