import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Change password state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Delete account state
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const token = localStorage.getItem('searchily_auth_token');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ─── Fetch Profile ───────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      } catch (err) {
        showToast('Could not load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ─── Sign Out ────────────────────────────────────────────────
  const handleSignOut = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } finally {
      localStorage.removeItem('searchily_auth_token');
      localStorage.removeItem('searchily_user_role');
      navigate('/auth');
    }
  };

  // ─── Update Profile ──────────────────────────────────────────
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ full_name: fullName, avatar_url: avatarUrl })
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      setProfile(prev => prev ? { ...prev, ...data } : data);
      setIsEditingProfile(false);
      showToast('Profile updated successfully.');
    } catch (err) {
      showToast('Could not update profile.');
    }
  };

  // ─── Change Password ─────────────────────────────────────────
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    try {
      const response = await fetch(`${API_URL}/user/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setPasswordError(data.detail || 'Failed to change password');
        return;
      }
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      showToast('Password changed successfully.');
    } catch (err) {
      setPasswordError('Could not change password.');
    }
  };

  // ─── Delete History ──────────────────────────────────────────
  const handleDeleteHistory = () => {
    localStorage.removeItem('searchily_history');
    showToast('Chat history successfully deleted.');
  };

  // ─── Export Data ─────────────────────────────────────────────
  const handleExportData = () => {
    const history = localStorage.getItem('searchily_history') || '[]';
    const exportData = {
      user: { name: profile?.full_name, email: profile?.email },
      history: JSON.parse(history)
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'searchily_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data exported successfully.');
  };

  // ─── Delete Account ──────────────────────────────────────────
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/user/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete account');
      localStorage.removeItem('searchily_auth_token');
      localStorage.removeItem('searchily_user_role');
      navigate('/auth');
    } catch (err) {
      showToast('Could not delete account.');
    }
  };

  // ─── Avatar Initial ──────────────────────────────────────────
  const getInitial = () => {
    if (profile?.full_name) return profile.full_name[0].toUpperCase();
    if (profile?.email) return profile.email[0].toUpperCase();
    return 'U';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-warm-ivory">
        <div className="w-8 h-8 bg-mistral-orange animate-spin rounded-none"></div>
      </div>
    );
  }

  return (
    <div className="bg-warm-ivory min-h-screen text-mistral-black flex flex-col relative w-full overflow-x-hidden">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-mistral-black text-warm-ivory px-6 py-4 z-50 border border-mistral-black/20 text-[12px] font-normal uppercase tracking-wider shadow-sm transition-all">
          {toastMessage}
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 w-full max-w-md border border-mistral-black/10">
            <h2 className="text-[20px] font-normal uppercase tracking-wider mb-6">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-mistral-black/70 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-mistral-black/20 outline-none focus:border-mistral-orange"
                />
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-mistral-black/70 mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-3 border border-mistral-black/20 outline-none focus:border-mistral-orange"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-3 bg-mistral-black text-white text-[12px] uppercase tracking-wider hover:bg-mistral-orange transition-colors">
                  Save
                </button>
                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 border border-mistral-black/20 text-[12px] uppercase tracking-wider hover:bg-mistral-black/5 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 w-full max-w-md border border-mistral-black/10">
            <h2 className="text-[20px] font-normal uppercase tracking-wider mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-mistral-black/70 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-mistral-black/20 outline-none focus:border-mistral-orange"
                />
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-mistral-black/70 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-mistral-black/20 outline-none focus:border-mistral-orange"
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-3 bg-mistral-black text-white text-[12px] uppercase tracking-wider hover:bg-mistral-orange transition-colors">
                  Change
                </button>
                <button type="button" onClick={() => { setIsChangingPassword(false); setPasswordError(''); }} className="flex-1 py-3 border border-mistral-black/20 text-[12px] uppercase tracking-wider hover:bg-mistral-black/5 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeletingAccount && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 w-full max-w-md border border-mistral-black/10">
            <h2 className="text-[20px] font-normal uppercase tracking-wider mb-4">Delete Account</h2>
            <p className="text-[14px] text-mistral-black/60 mb-8">This action is permanent and cannot be undone. All your data will be deleted.</p>
            <div className="flex gap-4">
              <button onClick={handleDeleteAccount} className="flex-1 py-3 bg-red-600 text-white text-[12px] uppercase tracking-wider hover:bg-red-700 transition-colors">
                Delete Forever
              </button>
              <button onClick={() => setIsDeletingAccount(false)} className="flex-1 py-3 border border-mistral-black/20 text-[12px] uppercase tracking-wider hover:bg-mistral-black/5 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topbar */}
      <div className="h-[64px] px-6 flex items-center justify-between border-b border-mistral-black/10 bg-warm-ivory shrink-0 w-full">
        <Link to="/app" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Chat
        </Link>
        <div className="text-[12px] uppercase tracking-widest font-normal text-mistral-black/50">User Profile</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full p-6 md:p-12 lg:p-16">
        <h1 className="text-[32px] md:text-[48px] font-normal leading-[1] tracking-tight uppercase mb-12 border-b border-mistral-black/10 pb-6 w-full">
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 xl:gap-24 w-full">

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-8 w-full">
            <div>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-20 h-20 object-cover mb-6" />
              ) : (
                <div className="w-20 h-20 bg-mistral-black mb-6 flex items-center justify-center text-warm-ivory text-[32px] font-normal uppercase shrink-0">
                  {getInitial()}
                </div>
              )}
              <h2 className="text-[24px] font-normal uppercase tracking-wider mb-2">
                {profile?.full_name || 'No name set'}
              </h2>
              <p className="text-[14px] text-mistral-black/50 font-normal uppercase tracking-wider">
                {profile?.email}
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-mistral-black/10 w-full">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="w-full justify-start text-left bg-mistral-black/5 px-4 py-3 text-[14px] font-normal uppercase tracking-wider hover:bg-mistral-black text-mistral-black hover:text-white transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="w-full justify-start text-left bg-mistral-black/5 px-4 py-3 text-[14px] font-normal uppercase tracking-wider hover:bg-mistral-black text-mistral-black hover:text-white transition-colors"
              >
                Change Password
              </button>
              <div className="pt-8 w-full">
                <button
                  onClick={handleSignOut}
                  className="w-full justify-start text-left px-4 py-3 text-[14px] font-normal uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-12 w-full">
            <section className="w-full">
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 mb-6 pb-2 border-b border-mistral-black/10">
                Usage Details
              </h3>
              <div className="bg-white p-8 md:p-12 border border-mistral-black/10 rounded-none shadow-sm w-full">
                <div className="flex flex-wrap justify-between items-center mb-8 pb-8 border-b border-mistral-black/10 gap-4">
                  <span className="text-[16px] font-normal uppercase tracking-wider">Current Plan</span>
                  <span className="bg-cream text-mistral-black px-4 py-2 text-[12px] font-normal uppercase tracking-wider border border-mistral-black/10">
                    Free Tier
                  </span>
                </div>
                <div className="flex justify-between items-end mb-4 gap-4">
                  <span className="text-[16px] font-normal uppercase tracking-wider text-mistral-black/70">Searches this month</span>
                  <span className="text-[32px] font-normal">14 / 50</span>
                </div>
                <div className="w-full bg-mistral-black/5 h-2 mt-4">
                  <div className="bg-mistral-orange h-full" style={{ width: '28%' }}></div>
                </div>
              </div>
            </section>

            <section className="w-full">
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 mb-6 pb-2 border-b border-mistral-black/10">
                Data Management
              </h3>
              <div className="bg-white p-8 md:p-12 border border-mistral-black/10 rounded-none shadow-sm space-y-10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="max-w-xl">
                    <h4 className="text-[16px] font-normal uppercase tracking-wider mb-2">Clear Chat History</h4>
                    <p className="text-[14px] text-mistral-black/50">Permanently delete all conversational search history from this browser.</p>
                  </div>
                  <button
                    onClick={handleDeleteHistory}
                    className="shrink-0 bg-mistral-black text-white px-8 py-4 text-[14px] font-normal uppercase tracking-wider hover:bg-red-600 transition-colors"
                  >
                    Delete History
                  </button>
                </div>

                <div className="pt-10 border-t border-mistral-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="max-w-xl">
                    <h4 className="text-[16px] font-normal uppercase tracking-wider mb-2">Export Data</h4>
                    <p className="text-[14px] text-mistral-black/50">Download a JSON copy of your preferences and saved products.</p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="shrink-0 bg-cream border border-mistral-black/10 text-mistral-black px-8 py-4 text-[14px] font-normal uppercase tracking-wider hover:border-mistral-orange transition-colors"
                  >
                    Export JSON
                  </button>
                </div>

                <div className="pt-10 border-t border-mistral-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="max-w-xl">
                    <h4 className="text-[16px] font-normal uppercase tracking-wider mb-2 text-red-600">Delete Account</h4>
                    <p className="text-[14px] text-mistral-black/50">Permanently delete your account and all associated data.</p>
                  </div>
                  <button
                    onClick={() => setIsDeletingAccount(true)}
                    className="shrink-0 bg-red-50 border border-red-200 text-red-600 px-8 py-4 text-[14px] font-normal uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}