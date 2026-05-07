import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, UserX, UserCheck, Trash2 } from 'lucide-react';
import api from '../services/authService';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';

const roleColor = (role) => {
  if (role === 'admin') return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
  if (role === 'manager') return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
  return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/users')
      .then(r => setUsers(r.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateUser = async (id, data, msg) => {
    try {
      await api.put(`/users/${id}`, data);
      toast.success(msg);
      fetchUsers();
    } catch { toast.error('Failed to update user'); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch { toast.error('Failed to delete user'); }
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-purple-400" style={{ textShadow: '0 0 20px rgba(168,85,247,0.8)' }}>
            User Management
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Users', value: users.length, color: 'text-white' },
            { label: 'Active', value: users.filter(u => u.isActive).length, color: 'text-green-400' },
            { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'text-purple-400' }
          ].map(s => (
            <div key={s.label} className="shiny-card rounded-2xl p-5 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{loading ? '...' : s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="shiny-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">User</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Department</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Role</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Joined</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-10 text-gray-400">Loading users...</td></tr>
                ) : users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {u.firstName[0]}{u.lastName[0]}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{u.firstName} {u.lastName}</p>
                          <p className="text-gray-400 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm capitalize">{u.department}</td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => updateUser(u.id, { role: e.target.value }, 'Role updated')}
                        className={`text-xs font-bold px-3 py-1 rounded-full border-0 cursor-pointer ${roleColor(u.role)} bg-transparent`}
                      >
                        <option value="employee" className="bg-gray-900">Employee</option>
                        <option value="manager" className="bg-gray-900">Manager</option>
                        <option value="admin" className="bg-gray-900">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateUser(u.id, { isActive: !u.isActive }, u.isActive ? 'User deactivated' : 'User activated')}
                          className={`p-2 rounded-lg transition-all ${u.isActive ? 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400' : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'}`}
                          title={u.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {u.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;