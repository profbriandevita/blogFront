


export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: () => void;
    logout: () => void;
    username: string;
    userId: number | null;
    register: (username: string, email:string, password: string) => Promise<{success: boolean, message: string}>;
}


