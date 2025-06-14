
import { useState, useEffect } from 'react';
import { AddProductModal } from '@/components/AddProductModal';
import { ProductsModal } from '@/components/ProductsModal';
import { PaymentMethodsModal } from '@/components/PaymentMethodsModal';
import { CustomizeStoreModal } from '@/components/CustomizeStoreModal';
import { ReferralsModal } from '@/components/ReferralsModal';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { PaymentMethodReminder } from '@/components/dashboard/PaymentMethodReminder';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PlanCard } from '@/components/dashboard/PlanCard';
import { StoreImprovementChecklist } from '@/components/dashboard/StoreImprovementChecklist';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeName] = useState("Mi Negocio GQ");
  const [hasPaymentMethod] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
