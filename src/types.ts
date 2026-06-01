export interface User {
  id: string;
  username: string;
  fullName: string;
  department: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface AuditFile {
  id: string;
  name: string;
  status: 'success' | 'pending' | 'error';
  issueCount?: number;
}

export interface AuditIssue {
  id: string;
  chapter: string;
  originalText: string;
  reason: string;
  suggestion: string;
  status: 'pending' | 'resolved';
}
