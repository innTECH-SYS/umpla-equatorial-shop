
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const criteria = [
    {
      label: 'Al menos 6 caracteres',
      test: (pwd: string) => pwd.length >= 6,
    },
    {
      label: 'Una letra mayúscula',
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      label: 'Una letra minúscula',
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      label: 'Un número',
      test: (pwd: string) => /\d/.test(pwd),
    },
    {
      label: 'Un carácter especial',
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const passedCriteria = criteria.filter(criterion => criterion.test(password)).length;
  const strength = (passedCriteria / criteria.length) * 100;

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Débil';
    if (strength < 70) return 'Media';
    return 'Fuerte';
  };

  const getTextColor = () => {
    if (strength < 40) return 'text-red-600';
    if (strength < 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Seguridad de la contraseña:</span>
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>

      <div className="space-y-1">
        {criteria.map((criterion, index) => {
          const passed = criterion.test(password);
          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              {passed ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span className={passed ? 'text-green-600' : 'text-red-600'}>
                {criterion.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
