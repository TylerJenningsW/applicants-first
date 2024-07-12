import { z } from 'zod'
import { RegisterFormValidation } from './validation'

export type RegisterFormValues = z.infer<typeof RegisterFormValidation>

export interface Profile {
  id: string
  first_name: string
  last_name: string
  organization_id: string
}

export interface Organization {
  organizationid: string
  organizationname: string
}
