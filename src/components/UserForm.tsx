import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userFields, generateValidationSchema, type FieldConfig } from '../config/userFields';
import type { User } from '../types/user';

interface UserFormProps {
  onSubmit: (data: User) => void;
  initialData?: User;
  isLoading?: boolean;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ 
  onSubmit, 
  initialData, 
  isLoading = false, 
  isEditing = false 
}) => {
  const validationSchema = generateValidationSchema();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<User>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    },
    values: initialData
  });

  const onFormSubmit = (data: User) => {
    onSubmit(data);
    // Always reset form after successful submission
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    });
  };

  const handleFormSubmit = handleSubmit(onFormSubmit);

  const renderField = (field: FieldConfig) => (
    <div key={field.name} className="mb-6">
      <label 
        htmlFor={field.name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.name as keyof User}
        control={control}
        render={({ field: controllerField }) => (
          <input
            {...controllerField}
            type={field.type}
            id={field.name}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors[field.name as keyof User] 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
          />
        )}
      />
      {errors[field.name as keyof User] && (
        <div className="text-red-500 text-sm mt-1 font-medium">
          {errors[field.name as keyof User]?.message}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit User' : 'Create New User'}
      </h2>
      
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-6">
          {userFields.map(renderField)}
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
            }`}
          >
            {isLoading ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
