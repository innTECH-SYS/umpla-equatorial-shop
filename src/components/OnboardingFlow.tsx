
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Globe, 
  Store, 
  Shield, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  MapPin,
  CreditCard
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { t, changeLanguage, language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'language',
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={language === 'es' ? 'default' : 'outline'}
              onClick={() => changeLanguage('es')}
              className="h-20 flex-col gap-2"
            >
              <span className="text-2xl">🇪🇸</span>
              <span>Español</span>
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => changeLanguage('en')}
              className="h-20 flex-col gap-2"
            >
              <span className="text-2xl">🇬🇧</span>
              <span>English</span>
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'discover',
      icon: <Store className="h-12 w-12 text-green-600" />,
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-sm">TechnoMax</h3>
                <p className="text-xs text-gray-600">Tecnología</p>
                <Badge variant="secondary" className="mt-2">Verificada</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="font-semibold text-sm">ModaStyle</h3>
                <p className="text-xs text-gray-600">Moda</p>
                <Badge variant="secondary" className="mt-2">Verificada</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="font-semibold text-sm">SuperMarket</h3>
                <p className="text-xs text-gray-600">Alimentación</p>
                <Badge variant="secondary" className="mt-2">Verificada</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'secure',
      icon: <Shield className="h-12 w-12 text-purple-600" />,
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-sm">Pagos Seguros</h4>
                <p className="text-xs text-gray-600">Mobile Money, Transferencias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-sm">Entrega Local</h4>
                <p className="text-xs text-gray-600">En toda Guinea Ecuatorial</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ready',
      icon: <Sparkles className="h-12 w-12 text-yellow-600" />,
      title: t('onboarding.step4.title'),
      description: t('onboarding.step4.description'),
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={onComplete}>
              {t('onboarding.exploreStores')}
            </Button>
            <Button variant="outline" className="flex-1" onClick={onComplete}>
              {t('onboarding.createAccount')}
            </Button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">U</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('onboarding.welcome')}
            </h1>
            <p className="text-gray-600">
              {t('onboarding.subtitle')}
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {currentStepData.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {currentStepData.description}
            </p>
            {currentStepData.content}
          </div>

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={onComplete}
                className="text-gray-600"
              >
                {t('onboarding.skip')}
              </Button>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    {t('onboarding.previous')}
                  </Button>
                )}
                <Button onClick={nextStep}>
                  {t('onboarding.next')}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
