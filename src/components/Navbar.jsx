import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ShoppingBag, LogOut } from 'lucide-react';

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <ShoppingBag className="h-8 w-8" />
          MegaShop
        </Link>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link to="/explore" className="text-slate-600 hover:text-primary font-medium">Explore</Link>
              <Link to="/dashboard" className="text-slate-600 hover:text-primary font-medium">My Orders</Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-primary font-medium">Login</Link>
              <Link to="/register" className="btn-primary !w-auto !py-2">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
