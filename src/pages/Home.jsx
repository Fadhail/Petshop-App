import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPets, fetchOwners, fetchServices, fetchAppointments } from '../services/api';

export default function Home() {
  const [stats, setStats] = useState({
    pets: 0,
    owners: 0,
    services: 0,
    appointments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [petsRes, ownersRes, servicesRes, appointmentsRes] = await Promise.all([
          fetchPets(),
          fetchOwners(),
          fetchServices(),
          fetchAppointments(),
        ]);

        setStats({
          pets: petsRes.data.length,
          owners: ownersRes.data.length,
          services: servicesRes.data.length,
          appointments: appointmentsRes.data.length,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statsData = [
    { name: 'Total Pets', value: stats.pets, to: '/pets' },
    { name: 'Total Owners', value: stats.owners, to: '/owners' },
    { name: 'Services', value: stats.services, to: '/services' },
    { name: 'Appointments', value: stats.appointments, to: '/appointments' },
  ];

  const quickActions = [
    { 
      name: 'Add New Pet', 
      to: '/pets', 
      icon: '🐶',
      onClick: () => navigate('/pets')
    },
    { 
      name: 'Schedule Appointment', 
      to: '/appointments', 
      icon: '📅',
      onClick: () => {
        // First navigate to appointments, then open the modal
        navigate('/appointments');
        // This will be handled by the Appointments component
      }
    },
    { 
      name: 'Manage Services', 
      to: '/services', 
      icon: '💈',
      onClick: () => navigate('/services')
    },
    { 
      name: 'View Owners', 
      to: '/owners', 
      icon: '👥',
      onClick: () => navigate('/owners')
    },
  ];


  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome to your Pet Shop Management System</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {isLoading ? (
          // Loading skeleton
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
              <div className="px-4 py-5 sm:p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))
        ) : (
          statsData.map((stat) => (
            <Link
              key={stat.name}
              to={stat.to}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="grid grid-cols-2 gap-4 sm:col-span-2">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={action.onClick}
                    className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-6 transition-colors duration-200"
                  >
                    <span className="mr-2 text-xl">{action.icon}</span>
                    {action.name}
                  </button>
                ))}
              </div>
            </div>
          </dl>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Recent appointments and updates will appear here.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
}
