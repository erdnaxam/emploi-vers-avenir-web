
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Accès à votre parcours</h1>
          <AuthForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
