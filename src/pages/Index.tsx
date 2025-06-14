
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/hooks/useUserStore";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasStore, loading: storeLoading } = useUserStore();
  const { t } = useTranslation();

  const handleCreateStore = () => {
    if (user) {
      if (hasStore) {
        // If user has a store, go to dashboard with checklist focus
        navigate('/dashboard?focus=checklist');
      } else {
        // If user doesn't have a store, go to create store
        navigate('/create-store');
      }
    } else {
      navigate('/auth');
    }
  };

  const getMainButtonText = () => {
    if (!user) return t('home.main_cta');
    if (storeLoading) return t('common.loading');
    if (hasStore) return t('home.improve_store_tips');
    return t('home.main_cta');
  };

  const getSecondaryButtonText = () => {
    if (!user) return t('home.secondary_cta');
    if (hasStore) return t('home.see_my_store');
    return t('home.secondary_cta');
  };

  const handleSecondaryAction = () => {
    if (user && hasStore) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="px-4 py-8 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4 md:mb-6">
            {t('home.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            {t('home.hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleCreateStore}
              disabled={storeLoading}
            >
              {getMainButtonText()}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleSecondaryAction}
            >
              {getSecondaryButtonText()}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8 md:px-8 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-8 md:mb-12">
            {t('home.features_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🏪</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.feature_professional_store')}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('home.feature_professional_store_desc')}
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-success rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.feature_local_payments')}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('home.feature_local_payments_desc')}
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-premium rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.feature_analytics')}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('home.feature_analytics_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-8 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            {user && hasStore ? t('home.cta_title_existing') : t('home.cta_title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            {user && hasStore 
              ? t('home.cta_subtitle_existing')
              : t('home.cta_subtitle')
            }
          </p>
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={handleCreateStore}
            disabled={storeLoading}
          >
            {getMainButtonText()}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold">Umpla</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            {t('home.footer_tagline')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
