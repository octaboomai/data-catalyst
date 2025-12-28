import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Heart,
  Activity,
  Droplets,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Home,
  Zap,
  User,
  Menu,
  X,
} from 'lucide-react';

interface VitalSign {
  id: string;
  type: 'heart_rate' | 'blood_pressure' | 'oxygen' | 'temperature';
  value: number | string;
  unit: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

interface DashboardData {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  duration: number;
}

interface ActivityEntry {
  id: string;
  type: string;
  duration: number;
  calories: number;
  timestamp: Date;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  targetSteps: number;
  targetCalories: number;
  joinDate: Date;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'vitals' | 'tracker' | 'profile'>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vitals, setVitals] = useState<VitalSign[]>([
    {
      id: '1',
      type: 'heart_rate',
      value: 72,
      unit: 'bpm',
      timestamp: new Date(),
      status: 'normal',
    },
    {
      id: '2',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      timestamp: new Date(),
      status: 'normal',
    },
    {
      id: '3',
      type: 'oxygen',
      value: 98,
      unit: '%',
      timestamp: new Date(),
      status: 'normal',
    },
    {
      id: '4',
      type: 'temperature',
      value: 37.2,
      unit: '°C',
      timestamp: new Date(),
      status: 'normal',
    },
  ]);

  const [dashboardData, setDashboardData] = useState<DashboardData[]>([
    { date: 'Mon', steps: 8234, calories: 450, distance: 6.2, duration: 45 },
    { date: 'Tue', steps: 9821, calories: 520, distance: 7.4, duration: 55 },
    { date: 'Wed', steps: 7234, calories: 380, distance: 5.4, duration: 38 },
    { date: 'Thu', steps: 10234, calories: 680, distance: 7.7, duration: 62 },
    { date: 'Fri', steps: 8934, calories: 550, distance: 6.7, duration: 48 },
    { date: 'Sat', steps: 11234, calories: 720, distance: 8.5, duration: 75 },
    { date: 'Sun', steps: 6234, calories: 320, distance: 4.7, duration: 32 },
  ]);

  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([
    {
      id: '1',
      type: 'Running',
      duration: 45,
      calories: 680,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'Cycling',
      duration: 60,
      calories: 520,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'Swimming',
      duration: 30,
      calories: 420,
      timestamp: new Date(),
    },
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    height: 180,
    weight: 75,
    targetSteps: 10000,
    targetCalories: 2500,
    joinDate: new Date('2023-01-15'),
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(userProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const totalSteps = dashboardData.reduce((sum, day) => sum + day.steps, 0);
  const averageSteps = Math.round(totalSteps / dashboardData.length);
  const totalCalories = dashboardData.reduce((sum, day) => sum + day.calories, 0);
  const totalDistance = dashboardData.reduce((sum, day) => sum + day.distance, 0).toFixed(1);

  const getVitalStatusColor = (status: string): string => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getVitalStatusBg = (status: string): string => {
    switch (status) {
      case 'normal':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'critical':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const handleProfileSave = () => {
    setUserProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setTempProfile(userProfile);
    setIsEditingProfile(false);
  };

  const handleAddVital = (type: VitalSign['type'], value: number | string) => {
    const newVital: VitalSign = {
      id: Date.now().toString(),
      type,
      value,
      unit:
        type === 'heart_rate'
          ? 'bpm'
          : type === 'blood_pressure'
            ? 'mmHg'
            : type === 'oxygen'
              ? '%'
              : '°C',
      timestamp: new Date(),
      status: 'normal',
    };
    setVitals([newVital, ...vitals]);
  };

  const ActivityTypeIcon: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
      case 'Running':
        return <Activity className="w-5 h-5" />;
      case 'Cycling':
        return <Zap className="w-5 h-5" />;
      case 'Swimming':
        return <Droplets className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const Dashboard: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Steps</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalSteps.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Avg: {averageSteps.toLocaleString()} steps/day</p>
            </div>
            <Activity className="w-12 h-12 text-blue-400 opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Calories</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalCalories.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>
            <Zap className="w-12 h-12 text-green-400 opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Distance</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalDistance} km</p>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-400 opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Heart Rate</p>
              <p className="text-3xl font-bold text-red-600 mt-2">72</p>
              <p className="text-xs text-gray-500 mt-1">Normal</p>
            </div>
            <Heart className="w-12 h-12 text-red-400 opacity-30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="calories" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Distance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const Vitals: React.FC = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Current Vital Signs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vitals.slice(0, 4).map((vital) => (
            <div
              key={vital.id}
              className={`${getVitalStatusBg(vital.status)} rounded-lg p-4 border-l-4 ${
                vital.status === 'normal'
                  ? 'border-l-green-500'
                  : vital.status === 'warning'
                    ? 'border-l-yellow-500'
                    : 'border-l-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium capitalize">
                    {vital.type.replace('_', ' ')}
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${getVitalStatusColor(vital.status)}`}>
                    {vital.value} {vital.unit}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {vital.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {vital.type === 'heart_rate' && <Heart className="w-8 h-8 opacity-30" />}
                {vital.type === 'blood_pressure' && <Activity className="w-8 h-8 opacity-30" />}
                {vital.type === 'oxygen' && <Droplets className="w-8 h-8 opacity-30" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Vital History</h3>
        <div className="space-y-3">
          {vitals.map((vital) => (
            <div key={vital.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    vital.status === 'normal'
                      ? 'bg-green-500'
                      : vital.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-700 capitalize">{vital.type.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500">{vital.timestamp.toLocaleString()}</p>
                </div>
              </div>
              <p className="font-bold text-gray-800">
                {vital.value} {vital.unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Tracker: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 rounded-full p-3 text-blue-600">
                    <ActivityTypeIcon type={activity.type} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.type}</p>
                    <p className="text-sm text-gray-500">
                      {activity.duration} min • {activity.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-green-600">{activity.calories} kcal</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityLog.map((a) => ({ name: a.type, value: a.calories }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityLog.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const Profile: React.FC = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Profile Information</h3>
          {!isEditingProfile && (
            <button
              onClick={() => {
                setTempProfile(userProfile);
                setIsEditingProfile(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {!isEditingProfile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.age} years</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Height</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.height} cm</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Weight</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.weight} kg</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Member Since</label>
                <p className="text-gray-800 font-semibold mt-1">{userProfile.joinDate.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Age</label>
              <input
                type="number"
                value={tempProfile.age}
                onChange={(e) => setTempProfile({ ...tempProfile, age: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Height (cm)</label>
              <input
                type="number"
                value={tempProfile.height}
                onChange={(e) => setTempProfile({ ...tempProfile, height: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Weight (kg)</label>
              <input
                type="number"
                value={tempProfile.weight}
                onChange={(e) => setTempProfile({ ...tempProfile, weight: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Target Steps</label>
              <input
                type="number"
                value={tempProfile.targetSteps}
                onChange={(e) => setTempProfile({ ...tempProfile, targetSteps: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Target Calories</label>
              <input
                type="number"
                value={tempProfile.targetCalories}
                onChange={(e) => setTempProfile({ ...tempProfile, targetCalories: parseInt(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <button
                onClick={handleProfileSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={handleProfileCancel}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Goals & Targets</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Daily Steps Goal</span>
              <span className="text-sm font-semibold text-blue-600">{userProfile.targetSteps.toLocaleString()} steps</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Math.min((averageSteps / userProfile.targetSteps) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Daily Calories Goal</span>
              <span className="text-sm font-semibold text-green-600">{userProfile.targetCalories.toLocaleString()} kcal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${Math.min((totalCalories / 7 / userProfile.targetCalories) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white transform transition-transform lg:relative lg:translate-x-0 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Health Tracker
          </h1>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === 'dashboard'
                ? 'bg-white text-blue-600 font-semibold'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('vitals');
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === 'vitals'
                ? 'bg-white text-blue-600 font-semibold'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <Heart className="w-5 h-5" />
            Vital Signs
          </button>
          <button
            onClick={() => {
              setCurrentView('tracker');
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === 'tracker'
                ? 'bg-white text-blue-600 font-semibold'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <Activity className="w-5 h-5" />
            Activity Tracker
          </button>
          <button
            onClick={() => {
              setCurrentView('profile');
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === 'profile'
                ? 'bg-white text-blue-600 font-semibold'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 transition">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-xl font-bold text-gray-800 capitalize">{currentView}</h2>
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'vitals' && <Vitals />}
            {currentView === 'tracker' && <Tracker />}
            {currentView === 'profile' && <Profile />}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
