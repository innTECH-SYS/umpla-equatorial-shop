
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ImprovedLanguageSelectorProps {
  variant?: 'default' | 'compact' | 'mobile';
  showLabel?: boolean;
}

export const ImprovedLanguageSelector = ({ 
  variant = 'default', 
  showLabel = true 
}: ImprovedLanguageSelectorProps) => {
  const { t, changeLanguage, language } = useTranslation();

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸', shortName: 'ES' },
    { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  const getButtonContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">{currentLang?.shortName}</span>
          </div>
        );
      case 'mobile':
        return (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm">{currentLang?.flag} {currentLang?.name}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {showLabel && <span className="hidden sm:inline text-sm">Idioma</span>}
            <span className="text-sm">{currentLang?.flag}</span>
          </div>
        );
    }
  };

  const getButtonSize = () => {
    switch (variant) {
      case 'compact':
        return 'sm';
      case 'mobile':
        return 'default';
      default:
        return 'sm';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === 'mobile' ? 'ghost' : 'outline'} 
          size={getButtonSize()}
          className={`${variant === 'mobile' ? 'w-full justify-start' : 'flex items-center gap-2'}`}
        >
          {getButtonContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50 min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
