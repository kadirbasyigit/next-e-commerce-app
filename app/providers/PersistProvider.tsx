'use client';

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/app/store/store';

const PersistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistProvider;
