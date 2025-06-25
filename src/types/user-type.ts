// types/user.ts
export interface Device {
  id: string;
  device_name: string;
  device_type: string;
  ip_address: string;
  browser: string;
  os: string;
  logged_in_at: string;
}

export interface User {
  id: string;
  full_name: string;
  user_name: string;
  email: string;
  roles: string[];
  created_at: string;
  avatar: string | null;
  devices: Device[];
}
