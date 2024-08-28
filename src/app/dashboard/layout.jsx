import PersistentDrawer from '@/components/PersistentDrawer';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <PersistentDrawer title={metadata.title}>
      {children}
    </PersistentDrawer>
  );
}
