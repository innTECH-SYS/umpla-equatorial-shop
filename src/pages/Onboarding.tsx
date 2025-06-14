
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const steps = [
    {
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl md:text-6xl mb-4">🏪</div>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
            {t('onboarding.step1.content')}
          </p>
        </div>
      )
    },
    {
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🏪</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step2.professional_store')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step2.professional_store_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">💳</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step2.local_payments')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step2.local_payments_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-premium rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">📦</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step2.physical_digital')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step2.physical_digital_desc')}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🌐</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step3.custom_domain')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step3.custom_domain_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🛠️</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step3.technical_support')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step3.technical_support_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-premium rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">📊</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">{t('onboarding.step3.advanced_analytics')}</h3>
              <p className="text-xs md:text-sm text-gray-600">{t('onboarding.step3.advanced_analytics_desc')}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('onboarding.step4.title'),
      description: t('onboarding.step4.description'),
      content: (
        <div className="text-center space-y-6">
          <div className="text-4xl md:text-6xl mb-4">🚀</div>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
            {t('onboarding.step4.content')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/create-store')}
              className="w-full sm:w-auto"
            >
              {t('onboarding.step4.create_store')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/store-example')}
              className="w-full sm:w-auto"
            >
              {t('onboarding.step4.explore')}
            </Button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-xs md:text-sm text-gray-500">
            {t('onboarding.step_indicator', { current: currentStep + 1, total: steps.length })}
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-secondary mb-2 md:mb-4">
              {currentStepData.title}
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-8 md:mb-12">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          {currentStep < steps.length - 1 ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                {t('onboarding.skip')}
              </Button>
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full sm:w-auto"
              >
                {t('onboarding.next')}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
