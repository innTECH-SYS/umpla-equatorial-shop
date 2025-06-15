
import { ImprovedCartSidebar } from './ImprovedCartSidebar';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  storeId: string;
}

export const CartSidebar = ({ isOpen, onClose, storeName, storeId }: CartSidebarProps) => {
  return (
    <ImprovedCartSidebar 
      isOpen={isOpen}
      onClose={onClose}
      storeName={storeName}
      storeId={storeId}
    />
  );
};
