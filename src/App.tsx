import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { Notifications, type Notification } from './components/Notifications';
import type { User } from './types/user';

const API_BASE_URL = '/api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add notification
  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>(API_BASE_URL);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Please make sure the API server is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create or update user
  const saveUser = async (userData: User) => {
    setLoading(true);
    setError(null);
    
    try {
      if (editingUser && editingUser.id) {
        // Update existing user
        await axios.put(`${API_BASE_URL}/${editingUser.id}`, userData);
        setEditingUser(null);
        addNotification('User updated successfully!', 'success');
      } else {
        // Create new user
        await axios.post(API_BASE_URL, userData);
        addNotification('User created successfully!', 'success');
      }
      
      await fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to save user. Please try again.');
      addNotification('Failed to save user. Please try again.', 'error');
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`${API_BASE_URL}/${userId}`);
      await fetchUsers(); // Refresh the list
      addNotification('User deleted successfully!', 'success');
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      addNotification('Failed to delete user. Please try again.', 'error');
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Edit user
  const editUser = (user: User) => {
    setEditingUser(user);
  };

  // Cancel editing
  // const cancelEdit = () => {
  //   setEditingUser(null);
  // };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            User Management System
          </h1>
          
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Form */}
        <UserForm
          onSubmit={saveUser}
          initialData={editingUser || undefined}
          isLoading={loading}
          isEditing={!!editingUser}
        />

        {/* Users Table */}
        <UserTable
          users={users}
          loading={loading}
          onEdit={editUser}
          onDelete={deleteUser}
        />
      </div>

      {/* Notifications */}
      <Notifications
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default App;
