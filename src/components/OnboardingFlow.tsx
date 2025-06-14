
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Store, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t, changeLanguage, language } = useTranslation();

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const steps = [
    {
      icon: <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />,
      title: t('onboarding.step1.title'),
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">{t('onboarding.step1.description')}</p>
          <div className="space-y-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? 'default' : 'outline'}
                className="w-full justify-start gap-3"
                onClick={() => changeLanguage(lang.code)}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: <Store className="h-16 w-16 text-green-600 mx-auto mb-4" />,
      title: t('onboarding.step2.title'),
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('onboarding.step2.description')}</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              ✓ Productos verificados<br/>
              ✓ Vendedores locales<br/>
              ✓ Entregas seguras
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />,
      title: t('onboarding.step3.title'),
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('onboarding.step3.description')}</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Pagos protegidos<br/>
              ✓ Garantía de entrega<br/>
              ✓ Soporte 24/7
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <div className="text-6xl mx-auto mb-4">🎉</div>,
      title: t('onboarding.step4.title'),
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">{t('onboarding.step4.description')}</p>
          <div className="space-y-3">
            <Button onClick={onComplete} className="w-full">
              {t('onboarding.exploreStores')}
            </Button>
            <Button variant="outline" onClick={onComplete} className="w-full">
              {t('onboarding.createAccount')}
            </Button>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">{t('onboarding.welcome')}</h1>
            <p className="text-gray-600">{t('onboarding.subtitle')}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-4">
              {steps[currentStep].icon}
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('onboarding.previous')}
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                {t('onboarding.next')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={onComplete} className="flex items-center gap-2">
                {t('onboarding.getStarted')}
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <Button variant="ghost" onClick={onComplete} className="text-sm text-gray-500">
              {t('onboarding.skip')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
