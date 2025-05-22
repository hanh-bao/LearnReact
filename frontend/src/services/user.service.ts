// Mock user service implementation
export interface User {
  id: string;
  fullname: string;
  email: string;
}

export interface ApiResponse<T = any> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}

export interface ProfileData {
  fullName: string;
  email?: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Mock user data
const mockUser: User = {
  id: "user-123",
  fullname: "John Doe",
  email: "john.doe@example.com",
};

export const userApis = {
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      status: 200,
      success: true,
      data: mockUser,
    };
  },

  updateProfile: async (
    userId: string,
    data: ProfileData
  ): Promise<ApiResponse> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update mock user data
    mockUser.fullname = data.fullName;

    return {
      status: 200,
      success: true,
      message: "Profile updated successfully",
    };
  },

  updatePassword: async (
    userId: string,
    data: PasswordData
  ): Promise<ApiResponse> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      status: 200,
      success: true,
      message: "Password updated successfully",
    };
  },
};
