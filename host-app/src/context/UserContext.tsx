import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface UserProfile {
    name: string;
    role: string;
    avatar: string;
}

interface UserContextType {
    user: UserProfile;
    updateUser: (data: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
    name: 'Admin User',
    role: 'Super Admin',
    avatar: 'A',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>(defaultUser);

    const updateUser = (data: Partial<UserProfile>) => {
        setUser((prev) => ({ ...prev, ...data }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
