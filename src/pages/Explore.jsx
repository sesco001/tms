import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Star } from 'lucide-react';

export default function Explore() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    const { data, error } = await supabase.from('shopkeepers').select('*').eq('status', 'Active');
    if (data) setShops(data);
    setLoading(false);
  };

  if (loading) return <div className="text-center py-20">Loading Shops...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Explore Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map(shop => (
          <div key={shop.id} className="card group cursor-pointer hover:border-primary transition-colors">
            <div className="h-40 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">
              <span className="text-4xl">🏪</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{shop.shopName || shop.name}</h3>
            <p className="text-slate-500 text-sm mb-2">{shop.category || 'General Store'}</p>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1"><MapPin size={16} /> Open Now</span>
              <span className="flex items-center gap-1 text-accent"><Star size={16} fill="currentColor" /> 4.8</span>
            </div>
            <button className="mt-4 w-full py-2 border border-primary text-primary rounded-lg font-medium group-hover:bg-primary group-hover:text-white transition-all">
              View Products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
