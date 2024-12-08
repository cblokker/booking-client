import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle2, Calendar, BookOpen } from 'lucide-react';
import { useCurrentUser } from './../../queries/sessions/useSessions'; // Import the React Query hook

const CoachNavItems = [
  { 
    icon: Calendar, 
    label: 'Manage Availability', 
    path: '/availability' 
  },
];

const StudentNavItems = [
  { 
    icon: Calendar, 
    label: 'Book a Call', 
    path: '/book'
  },
];

const SharedNavItems = [
  { 
    icon: BookOpen, 
    label: 'My Calls', 
    path: '/my-calls' 
  }
];

const NavItem = ({ icon, label, path }) => {
  const Icon = icon;
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link
      to={path}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );
};

export default function Sidebar() {
  const { data: currentUser, isLoading } = useCurrentUser(); // Fetch current user

  // Show a loading state until the current user is fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Combine shared items with role-specific items
  const roleNavItems = currentUser?.role === 'coach' 
    ? [...SharedNavItems, ...CoachNavItems] 
    : [...SharedNavItems, ...StudentNavItems];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <UserCircle2 className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold">Bookable</span>
        </div>
        
        <nav className="space-y-2">
          {roleNavItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );
}
