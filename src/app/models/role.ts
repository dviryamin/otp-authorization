export interface MappingsRoles {
  realmMappings: Role[];
}

export interface Role {
  name: string;
  otpRequired: boolean;
}
