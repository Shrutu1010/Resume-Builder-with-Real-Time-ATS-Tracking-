export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Mock authentication service - in a real app, this would connect to a backend
class AuthService {
  private users: Map<string, { id: string; name: string; email: string; password: string; createdAt: string }> = new Map();
  private currentUser: AuthUser | null = null;

  constructor() {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('resumeBuilder_users');
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      usersArray.forEach((user: any) => {
        this.users.set(user.email, user);
      });
    }

    // Check for existing session
    const savedUser = localStorage.getItem('resumeBuilder_currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  private saveUsers() {
    const usersArray = Array.from(this.users.values());
    localStorage.setItem('resumeBuilder_users', JSON.stringify(usersArray));
  }

  private saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem('resumeBuilder_currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('resumeBuilder_currentUser');
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthUser> {
    const { name, email, password } = credentials;

    // Check if user already exists
    if (this.users.has(email)) {
      throw new Error('User with this email already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate password
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Create new user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this would be hashed
      createdAt: new Date().toISOString(),
    };

    this.users.set(email, user);
    this.saveUsers();

    // Set as current user
    this.currentUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
    this.saveCurrentUser();

    return this.currentUser;
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const { email, password } = credentials;

    const user = this.users.get(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    this.currentUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
    this.saveCurrentUser();

    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    this.saveCurrentUser();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService();