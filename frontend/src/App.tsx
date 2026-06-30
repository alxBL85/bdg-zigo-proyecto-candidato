import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderEntryScreen } from './components/OrderEntryScreen';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderEntryScreen
        orderId="o0000000-0000-0000-0000-000000000001"
        customerId="c0000000-0000-0000-0000-000000000001"
      />
    </QueryClientProvider>
  );
};

export default App;
