import * as yup from 'yup';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  placeholder?: string;
  required: boolean;
  validation: yup.AnySchema;
}

export const userFields: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    required: true,
    validation: yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must not exceed 50 characters')
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    required: true,
    validation: yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters')
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1234567890',
    required: true,
    validation: yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be 10-15 digits, optionally starting with +')
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    required: true,
    validation: yup.string()
      .required('Email is required')
      .email('Please enter a valid email address')
  }
];

// Generate Yup validation schema from field configurations
export const generateValidationSchema = () => {
  const schemaObject: Record<string, yup.AnySchema> = {};
  
  userFields.forEach(field => {
    schemaObject[field.name] = field.validation;
  });
  
  return yup.object().shape(schemaObject);
};

// HOW TO ADD A NEW FIELD:
// 1. Add a new field object to the userFields array above
// 2. Define the field properties: name, label, type, placeholder, required, validation
// 3. The form and table components will automatically pick up the new field
// 4. No changes needed in UserForm.tsx or App.tsx components
//
// Example for adding "Date of Birth":
// {
//   name: 'dateOfBirth',
//   label: 'Date of Birth',
//   type: 'date',
//   placeholder: 'YYYY-MM-DD',
//   required: false,
//   validation: yup.date()
//     .nullable()
//     .max(new Date(), 'Date of birth cannot be in the future')
// }
