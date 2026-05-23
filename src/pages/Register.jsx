import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { User, Mail, Lock, Store, Loader2 } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', role: 'customer', shopName: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      alert(authError.message);
      setLoading(false);
      return;
    }

    const table = formData.role === 'shop' ? 'shopkeepers' : 'users';
    const record = {
      id: authData.user.id,
      email: formData.email,
      name: formData.name,
      role: formData.role,
      dateRegistered: new Date().toISOString(),
      ...(formData.role === 'shop' && { shopName: formData.shopName, status: 'Active' })
    };

    const { error: dbError } = await supabase.from(table).insert([record]);

    if (dbError) alert(dbError.message);
    else {
      alert('Registration successful! Please login.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Create Account</h2>
        
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          <button 
            type="button"
            onClick={() => setFormData({...formData, role: 'customer'})}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.role === 'customer' ? 'bg-white shadow text-primary' : 'text-slate-500'}`}
          >
            Customer
          </button>
          <button 
            type="button"
            onClick={() => setFormData({...formData, role: 'shop'})}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.role === 'shop' ? 'bg-white shadow text-primary' : 'text-slate-500'}`}
          >
            Shopkeeper
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required 
          />
          
          {formData.role === 'shop' && (
            <div className="relative">
              <Store className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="text" placeholder="Shop Name" 
                className="w-full pl-10 p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} required 
              />
            </div>
          )}

          <input 
            type="email" placeholder="Email" 
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required 
          />
          
          <button disabled={loading} className="btn-primary">
            {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
