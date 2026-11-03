export interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'agent' | 'admin';
  is_staff: boolean;
  is_superuser: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, passwordConfirm: string) => Promise<void>;
  logout: () => Promise<void>;
}