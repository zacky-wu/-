import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, UserSquare2 } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between shrink-0 shadow-sm z-10 w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <div className="w-2 h-2 bg-white rotate-45"></div>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">智能文书审计系统</span>
          </div>
          
          <nav className="flex space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-black font-semibold' 
                    : 'text-gray-500 hover:bg-gray-50 font-medium'
                }`
              }
            >
              工作区
            </NavLink>
            <button className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-colors font-medium">
              知识库
            </button>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-xl transition-colors flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-gray-100 text-black font-semibold' 
                    : 'text-gray-500 hover:bg-gray-50 font-medium'
                }`
              }
            >
              <UserSquare2 className="w-4 h-4" />
              人员管理
            </NavLink>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm text-gray-600">审查模型</span>
            <span className="text-sm font-medium text-gray-900">Deepseek-V3.2</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors p-1"
            title="退出登录"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden w-full relative">
        <Outlet />
      </main>
    </div>
  );
}
