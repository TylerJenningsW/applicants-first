import { z } from 'zod'
import { RegisterFormValidation } from './validation'

export type RegisterFormValues = z.infer<typeof RegisterFormValidation>

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  organization_id: number | null;
}

export interface Organization {
  OrganizationID: number;
  OrganizationName: string;
}
