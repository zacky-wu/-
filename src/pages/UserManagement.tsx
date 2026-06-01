import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import type { User } from '../types';

const MOCK_USERS: User[] = [
  { id: '1', username: 'admin', fullName: '系统管理员', department: '信息技术部', role: '超级管理员', status: 'active' },
  { id: '2', username: 'zhangsan', fullName: '张三', department: '审计一处', role: '审查员', status: 'active' },
  { id: '3', username: 'lisi', fullName: '李四', department: '审计二处', role: '审查员', status: 'active' },
  { id: '4', username: 'wangwu', fullName: '王五', department: '合规部', role: '审查员', status: 'inactive' },
];

export default function UserManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-6 w-full h-full overflow-y-auto bg-gray-50">
      <div className="mb-8 flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">人员管理</h1>
          <p className="mt-1 text-sm font-medium text-gray-400">管理系统账号、分配角色和部门归属</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新建成员
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between w-full">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索真实姓名或登录名..."
              className="bg-gray-100 border-none rounded-lg block w-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-black outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div className="flex space-x-3">
            <select className="bg-gray-100 border-none rounded-lg block w-full pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-black outline-none cursor-pointer text-gray-700 appearance-none">
              <option>所有部门</option>
              <option>信息技术部</option>
              <option>审计一处</option>
              <option>审计二处</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 table-fixed w-full items-stretch">
            <thead className="bg-gray-50/50 border-b border-gray-100 w-full">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  用户名
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  真实姓名
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  部门
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  角色
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50 w-full">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs uppercase tracking-wider">
                        {user.username.substring(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                      {user.department}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                      user.status === 'active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-rose-50 text-rose-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-600' : 'bg-rose-600'}`}></span>
                      {user.status === 'active' ? '正常' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-black bg-white shadow-sm border border-gray-100 p-1.5 rounded-md transition-all" title="编辑">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-rose-600 bg-white shadow-sm border border-gray-100 p-1.5 rounded-md transition-all" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6 w-full">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                显示 <span className="font-medium">1</span> 到 <span className="font-medium">4</span> 条，共 <span className="font-medium">4</span> 条数据
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <button className="relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">
                  上一页
                </button>
                <button className="relative inline-flex items-center px-4 py-1.5 border-t border-b border-gray-200 bg-black text-xs font-bold text-white z-10">
                  1
                </button>
                <button className="relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">
                  下一页
                </button>
              </nav>
            </div>
          </div>
        </div>

      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">新建成员</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">账号 <span className="text-rose-500">*</span></label>
                  <input type="text" required className="w-full bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all placeholder-gray-400 text-gray-900" placeholder="请输入登录账号" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">密码 <span className="text-rose-500">*</span></label>
                  <input type="password" required className="w-full bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all placeholder-gray-400 text-gray-900" placeholder="请输入初始密码" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">姓名 <span className="text-rose-500">*</span></label>
                  <input type="text" required className="w-full bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all placeholder-gray-400 text-gray-900" placeholder="请输入真实姓名" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">手机</label>
                  <input type="tel" className="w-full bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all placeholder-gray-400 text-gray-900" placeholder="请输入手机号码" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">部门</label>
                <select className="w-full bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all appearance-none text-gray-900 cursor-pointer">
                  <option>信息技术部</option>
                  <option>审计一处</option>
                  <option>审计二处</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">系统角色 <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors bg-white">
                    <input type="radio" name="role" value="超级管理员" className="w-4 h-4 text-black focus:ring-black border-gray-300 cursor-pointer" />
                    <span className="text-sm font-bold text-gray-900">超级管理员</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors bg-white">
                    <input type="radio" name="role" value="审查员" defaultChecked className="w-4 h-4 text-black focus:ring-black border-gray-300 cursor-pointer" />
                    <span className="text-sm font-bold text-gray-900">审查员</span>
                  </label>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end gap-3 w-full">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  取消
                </button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  确认添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
