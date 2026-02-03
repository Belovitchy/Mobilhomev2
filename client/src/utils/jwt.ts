import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
};

export function getRolesFromToken(token: string): string[] {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const role =
      decoded.role ??
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
    if (!role) return [];

    return Array.isArray(role) ? role : [role];
  } catch (err) {
    return [];
  }
}

export function isAdminFromToken(token: string): boolean {
  const roles = getRolesFromToken(token);
  return roles.includes("admin");
}
