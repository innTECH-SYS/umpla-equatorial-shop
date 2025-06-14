
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const VerifiedBadge = ({ size = 'md', showText = false }: VerifiedBadgeProps) => {
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge className="bg-blue-500 text-white gap-1 hover:bg-blue-600">
          <Shield className={iconSize} />
          {showText && 'Verificado'}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Cuenta verificada mediante KYC</p>
      </TooltipContent>
    </Tooltip>
  );
};
