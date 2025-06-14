
import { useState, useEffect } from 'react';
import { AddProductModal } from '@/components/AddProductModal';
import { ProductsModal } from '@/components/ProductsModal';
import { PaymentMethodsModal } from '@/components/PaymentMethodsModal';
import { CustomizeStoreModal } from '@/components/CustomizeStoreModal';
import { ReferralsModal } from '@/components/ReferralsModal';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { MobileMoreMenu } from '@/components/dashboard/MobileMoreMenu';
import { MobileOrdersView } from '@/components/dashboard/MobileOrdersView';
import { PaymentMethodReminder } from '@/components/dashboard/PaymentMethodReminder';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PlanCard } from '@/components/dashboard/PlanCard';
import { StoreImprovementChecklist } from '@/components/dashboard/StoreImprovementChecklist';
import { SalesReports } from '@/components/dashboard/SalesReports';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeName] = useState("Mi Negocio GQ");
  const [hasPaymentMethod] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  // Estados para los modales
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const [customizeStoreOpen, setCustomizeStoreOpen] = useState(false);
  const [referralsOpen, setReferralsOpen] = useState(false);

  // Event listeners para abrir modales desde el checklist
  useEffect(() => {
    const handleOpenAddProductModal = () => setAddProductOpen(true);
    const handleOpenCustomizeStoreModal = () => setCustomizeStoreOpen(true);
    const handleOpenReferralsModal = () => setReferralsOpen(true);
    const handleOpenPaymentMethodsModal = () => setPaymentMethodsOpen(true);

    window.addEventListener('openAddProductModal', handleOpenAddProductModal);
    window.addEventListener('openCustomizeStoreModal', handleOpenCustomizeStoreModal);
    window.addEventListener('openReferralsModal', handleOpenReferralsModal);
    window.addEventListener('openPaymentMethodsModal', handleOpenPaymentMethodsModal);

    return () => {
      window.removeEventListener('openAddProductModal', handleOpenAddProductModal);
      window.removeEventListener('openCustomizeStoreModal', handleOpenCustomizeStoreModal);
      window.removeEventListener('openReferralsModal', handleOpenReferralsModal);
      window.removeEventListener('openPaymentMethodsModal', handleOpenPaymentMethodsModal);
    };
  }, []);

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            <PaymentMethodReminder 
              hasPaymentMethod={hasPaymentMethod}
              onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
            />
            <StatsGrid />
            <StoreImprovementChecklist />
          </div>
        );
      case 'orders':
        return <MobileOrdersView />;
      case 'analytics':
        return (
          <div className="p-4 pb-20">
            <SalesReports />
          </div>
        );
      case 'more':
        return (
          <MobileMoreMenu
            onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
            onCustomizeStoreClick={() => setCustomizeStoreOpen(true)}
            onReferralsClick={() => setReferralsOpen(true)}
          />
        );
      default:
        return (
          <div className="space-y-4">
            <PaymentMethodReminder 
              hasPaymentMethod={hasPaymentMethod}
              onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
            />
            <StatsGrid />
            <StoreImprovementChecklist />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        <Sidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
          onCustomizeStoreClick={() => setCustomizeStoreOpen(true)}
          onReferralsClick={() => setReferralsOpen(true)}
          onProductsClick={() => setProductsOpen(true)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header 
            storeName={storeName}
            setSidebarOpen={setSidebarOpen}
            onAddProductClick={() => setAddProductOpen(true)}
          />

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 space-y-6">
            <PaymentMethodReminder 
              hasPaymentMethod={hasPaymentMethod}
              onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
            />

            <StatsGrid />

            {/* Checklist de mejoras */}
            <StoreImprovementChecklist />

            {/* Sales Reports */}
            <SalesReports />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions 
                onAddProductClick={() => setAddProductOpen(true)}
                onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
                onCustomizeStoreClick={() => setCustomizeStoreOpen(true)}
                onReferralsClick={() => setReferralsOpen(true)}
                onProductsClick={() => setProductsOpen(true)}
              />
              <PlanCard />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <MobileHeader storeName={storeName} activeTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto">
          {renderMobileContent()}
        </main>

        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddProductClick={() => setAddProductOpen(true)}
          onProductsClick={() => setProductsOpen(true)}
          onPaymentMethodsClick={() => setPaymentMethodsOpen(true)}
          onCustomizeStoreClick={() => setCustomizeStoreOpen(true)}
          onReferralsClick={() => setReferralsOpen(true)}
        />
      </div>

      {/* Modales */}
      <AddProductModal 
        open={addProductOpen} 
        onOpenChange={setAddProductOpen} 
      />
      <ProductsModal 
        open={productsOpen} 
        onOpenChange={setProductsOpen}
        onAddProduct={() => setAddProductOpen(true)}
      />
      <PaymentMethodsModal 
        open={paymentMethodsOpen} 
        onOpenChange={setPaymentMethodsOpen} 
      />
      <CustomizeStoreModal 
        open={customizeStoreOpen} 
        onOpenChange={setCustomizeStoreOpen} 
      />
      <ReferralsModal 
        open={referralsOpen} 
        onOpenChange={setReferralsOpen} 
      />
    </div>
  );
};

export default Dashboard;
