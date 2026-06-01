import React from 'react';
import { UploadCloud, FileText, Trash2, Search, Filter, RefreshCcw, Download, MessageSquareText, ChevronDown } from 'lucide-react';
import type { AuditFile, AuditIssue } from '../types';

const MOCK_FILES: AuditFile[] = [
  { id: '1', name: '大唐石城子项目部铅丝网采购招标文件 (已批注)', status: 'success', issueCount: 24 },
  { id: '2', name: '中国安能集团二局电力公司柴达木线路工程吊机租赁采购项目-招标文件', status: 'success', issueCount: 6 },
  { id: '3', name: '中国安能二局陆河抽蓄场内道路项目部爆破安全监理服务采购项目招标文件', status: 'success', issueCount: 30 },
  { id: '4', name: '中国安能二局湖北应城风电项目钢板租赁服务采购项目招标文件', status: 'success', issueCount: 18 },
  { id: '5', name: '中国安能二局广东抽蓄场内道路项目部水稳料、级配碎石采购招标文件', status: 'success', issueCount: 21 },
];

const MOCK_ISSUES: AuditIssue[] = [
  { 
    id: '1', 
    chapter: '第一章 招标公告', 
    originalText: '4.3 招标文件售价为0元整。支付标书费采用银行对公转账（电汇）方式，投标人无论中标与否，售后款项不予退还。', 
    reason: '招标文件售价明确为0元，但又要求投标人支付标书费且售后不退，前后表述严重矛盾，容易导致投标人误解。', 
    suggestion: '删除关于支付标书费的错误表述，或明确若售价为0元则无需支付任何费用。', 
    status: 'pending' 
  },
  { 
    id: '2', 
    chapter: '第二章 投标人须知', 
    originalText: '是否要求中标人缴纳履约保证金： 不要。求：1.缴纳方式：银行保函（保函应为由建设银行、中国银行、农业银行、工商银行、交通银行等出具的独立保函）或银行转账。 2.金额： 3.有效期： 4.缴纳时间：中标通知书到达当日 5.履约保证金收款账户信息如下...', 
    reason: '前附表7.6.1选择"不要求"缴纳履约保证金，却同时列出了缴纳方式、金额、有效期等详细要求，前后矛盾，易引起误解。', 
    suggestion: '统一履约保证金条款：若确实不要求缴纳，应删除后续所有缴纳相关子项；若实际要求缴纳，应将"不要求"改为"要求"，并明确金额和期限。', 
    status: 'pending' 
  },
  { 
    id: '3', 
    chapter: '第四章 合同条款及格式', 
    originalText: '甲方在验收完毕后的3日内向乙方提出异议和处理意见。对产品质量的异议不受时间限制。', 
    reason: '质量异议期限前后矛盾：一方面规定3日内提出异议，另一方面又规定不受时间限制，导致约定不明确，容易引发争议。', 
    suggestion: '删除矛盾表述，统一质量异议期：如为外观瑕疵可约定较短期限，为隐蔽瑕疵约定为自发现之日起合理期限或最长不超过收货后两年。', 
    status: 'pending' 
  }
];

export default function Dashboard() {
  return (
    <div className="flex-1 flex overflow-hidden w-full h-full bg-gray-100">
      
      {/* LEFT COLUMN: HISTORY FILES */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-700 mb-3">历史文件</h2>
          <button className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-2.5 text-sm font-semibold transition-all shadow-sm focus:outline-none mb-3">
            添加文件
          </button>
          
          <div className="border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-4 text-center hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer group">
            <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2 group-hover:text-gray-600 transition-colors" />
            <p className="text-xs text-gray-500">拖拽文件到此处上传 (支持多文件)</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {MOCK_FILES.map((file, i) => (
            <div key={file.id} className={`p-3 rounded-xl border text-sm flex gap-3 relative group transition-colors cursor-pointer ${i === 0 ? 'border-gray-300 bg-gray-50 shadow-sm' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'}`}>
              <div className="mt-1">
                <FileText className={`w-5 h-5 ${i === 0 ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <p className={`font-semibold truncate mb-1 text-[13px] leading-tight ${i === 0 ? 'text-gray-900' : 'text-gray-600'}`} title={file.name}>{file.name}</p>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  发现 <span className={i === 0 ? 'text-black font-bold' : 'font-medium'}>{file.issueCount}</span> 条
                </div>
              </div>
              <button className="absolute right-2 bottom-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE COLUMN: MAIN CONTENT TABLE */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 pt-3 px-3 pb-0">
        <div className="bg-white rounded-t-2xl border border-gray-200 shadow-sm flex flex-col flex-1 h-full overflow-hidden">
          
          {/* Top Info Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-gray-900 space-x-2">
              <span className="text-gray-300 font-bold">«</span>
              <h2 className="font-bold text-[16px] tracking-tight flex items-center gap-2">
                AI 智能审查
                <span className="text-gray-400 font-medium text-sm truncate max-w-sm ml-2">大唐石城子项目部铅丝网采购招标文件 (已批注).docx</span>
              </h2>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-3 border-b flex flex-col gap-3 bg-white">
            <div className="flex items-center justify-between text-xs w-full">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                <div className="px-2.5 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200">问题 24</div>
                <div className="px-2.5 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200">定位命中 23/24</div>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                  <span>章节</span>
                  <span className="font-bold">全部章节 (6)</span>
                  <ChevronDown className="w-3 h-3" />
                </div>

                <div className="flex gap-2 font-bold">
                  <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-md flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>严重 19</span>
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-md flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>重要 5</span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>一般 0</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>未定位 1</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs w-full">
               <div className="flex items-center gap-4 text-gray-500 font-medium">
                  <span>已确认 <span className="font-bold text-gray-900">0</span></span>
                  <span>误报 <span className="font-bold text-gray-900">0</span></span>
                  <span>待复核 <span className="font-bold text-black">24</span></span>
                  <div className="flex items-center gap-1 border border-gray-200 bg-gray-50 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-100 transition-colors">
                    RAG检索 <ChevronDown className="w-3 h-3" />
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold transition-all flex items-center gap-1.5 shadow-sm">
                    重新识别
                  </button>
                  <button className="px-4 py-1.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5">
                    导出表格
                  </button>
                  <button className="px-4 py-1.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5">
                    导出报告
                  </button>
               </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-32 border-b border-gray-100">章节</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">原文</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">问题原因</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">修改建议</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-32 border-b border-gray-100">复核状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {MOCK_ISSUES.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 align-top">
                      <div className="text-gray-900 font-bold text-sm tracking-tight">{issue.chapter}</div>
                    </td>
                    <td className="px-4 py-4 align-top w-2/6">
                      <div className="text-gray-600 leading-relaxed text-[13px]">{issue.originalText}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-gray-600 leading-relaxed text-[13px]">{issue.reason}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-gray-600 leading-relaxed text-[13px]">{issue.suggestion} <span className="text-gray-900 font-bold ml-1 cursor-pointer hover:underline">[1]</span></div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <select className="block w-full border-none bg-gray-100 text-gray-700 font-medium text-xs rounded-lg px-2 py-2 focus:ring-2 focus:ring-black outline-none hover:bg-gray-200 cursor-pointer text-center transition-colors appearance-none">
                        <option>待复核</option>
                        <option>已确认</option>
                        <option>误报</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: PREVIEW */}
      <div className="w-[420px] bg-white border border-gray-200 flex flex-col shrink-0 shadow-sm z-10 m-3 mr-3 ml-0 rounded-2xl overflow-hidden">
        {/* Preview Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h3 className="font-bold tracking-tight text-gray-900 text-[16px]">文档预览</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 font-medium text-xs rounded-md hover:bg-gray-50 transition-colors">上一条</button>
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 font-medium text-xs rounded-md hover:bg-gray-50 transition-colors">下一条 (7/23)</button>
            <button className="px-3 py-1.5 bg-black text-white font-semibold text-xs rounded-md hover:bg-gray-800 transition-colors">导出文档</button>
          </div>
        </div>

        {/* Fake Document Content */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 text-[13px] leading-relaxed text-gray-800 font-serif">
          
          <div className="bg-white p-6 shadow-sm border border-gray-200 min-h-[800px] mb-8 relative">
            <div className="absolute right-2 top-2">
              <div className="w-1.5 bg-gray-400 h-24 rounded-full opacity-50"></div>
            </div>

            <p className="mb-4">
              时，由其法定代表人/单位负责人或者代理人签字确认；投标人为其他组织的，由其主要负责人或者代理人签字确认。
            </p>
            <p className="bg-red-100 text-red-900 px-1 py-0.5 rounded mb-4 inline-block font-medium border border-red-200">
              3.投标人拒绝或者变相拒绝提供有效书面说明或者书面说明不能证明其报价合理性的，评标委员会有权将其投标文件作为无效投标处理。
            </p>
            
            <table className="w-full border-collapse border border-gray-300 text-xs mb-8">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center w-12 text-gray-500">10.2</td>
                  <td className="border border-gray-300 p-2 font-medium w-16">招标服务费</td>
                  <td className="border border-gray-300 p-2 text-gray-600">
                    本次收取中标单位招标服务费3000元。户名：中国安能集团第二工程局有限公司汇账号：31050184420000001768开户银行：中国建设银行股份有限公司上海邯郸路支行
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center text-gray-500">10.3</td>
                  <td className="border border-gray-300 p-2 font-medium">其他</td>
                  <td className="border border-gray-300 p-2 text-gray-600">
                    1.本项目不接受以传真、移动通信等方式送达的异议材料，投标人应通过中国安能电子采购平台递交。 2.投标人须知前附表出现"/"的条款，以须知正文的条款内容为准。 3.本项目非依法必须招标项目，为企业自主招标，相关流程仅部分参照《招标投标法》，本招标文件是依据国家法律、法规及本企业规章制度编制，解释权属招标人。 4.分包=允许：分包内容要求：分包金额要求：对分包人的资质要求：中标人不得向他人转让中标项目，接受分包的人不得再次分包。中标人应当就分包项目向招标人负责，接受分包的人就分包项目承担连带责任。不允许。
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-lg font-bold mb-2">1. 总则</h2>
            <h3 className="font-bold mb-2">1.1 招标项目概况</h3>
            <p className="mb-2">1.1.1 根据《中国安能建设集团有限公司采购管理规定》中国安能工管[2023]188号、《中国安能建设集团有限公司招标采购管理办法（试行）》中国安能工管[2021]343号等相关规定，本招标项目已具备招标条件，现进行公开招标。</p>
            <p className="mb-2 font-medium">1.1.2 招标人：见投标人须知前附表。</p>
            <p className="mb-2 font-medium">1.1.3 招标组织机构：中国安能集团第二工程局有限公司物资装备部。</p>
            
            <h3 className="font-bold mt-4 mb-2">1.2 招标项目的资金来源及比例和落实情况</h3>
            <p className="mb-1 font-medium">1.2.1 资金来源及比例：见投标人须知前附表。</p>
            <p className="mb-1 font-medium">1.2.2 资金落实情况：见投标人须知前附表。</p>

            <h3 className="font-bold mt-4 mb-2">1.3 招标范围、交货期、交货地点和质量标准</h3>
            <p className="mb-1 font-medium">1.3.1 招标范围：见投标人须知前附表。</p>
            <p className="mb-1 font-medium">1.3.2 交货期：见投标人须知前附表。</p>
            <p className="mb-1 font-medium">1.3.3 交货地点：见投标人须知前附表。</p>
            <p className="mb-1 font-medium">1.3.4 质量标准：见投标人须知前附表。</p>
            
            <h3 className="font-bold mt-4 mb-2">1.4 投标人资格要求</h3>
            <p className="mb-2 font-medium">1.4.1 投标人应具备承担本招标项目资质条件、能力和信誉：</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-6">
              <li>资质要求：见投标人须知前附表；</li>
              <li>财务要求：见投标人须知前附表（如有）；</li>
              <li>业绩要求：见投标人须知前附表（如有）；</li>
              <li>信誉要求：见投标人须知前附表（如有）；</li>
            </ul>

          </div>
        </div>

        {/* Global Assistant Bubble */}
        <div className="absolute bottom-6 right-6">
          <button className="bg-black shadow-lg rounded-full w-14 h-14 flex items-center justify-center text-white hover:bg-gray-800 transition-all hover:scale-105 group relative pointer-events-auto cursor-pointer border border-gray-800">
            <MessageSquareText className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">2</span>
          </button>
        </div>

      </div>

    </div>
  );
}
