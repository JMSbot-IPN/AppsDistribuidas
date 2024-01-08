import React from 'react';

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      storage: '5GB',
      users: '1 Usuario',
      features: ['Almacenamiento en la nube', 'Acceso en cualquier dispositivo'],
    },
    {
      name: 'Pro',
      price: '$9.99/mes',
      storage: '50GB',
      users: '1 Usuario',
      features: ['Almacenamiento en la nube', 'Soporte prioritario', 'Seguridad avanzada'],
    },
    {
      name: 'Empresa',
      price: '$19.99/mes',
      storage: '100GB',
      users: '5 Usuarios',
      features: ['Almacenamiento en la nube', 'Soporte 24/7', 'Control de acceso'],
    },
  ];

  return (
    <div className="subscription-plans">
      {plans.map((plan, index) => (
        <div className="plan-card" key={index}>
          <h2>{plan.name}</h2>
          <p className="price">{plan.price}</p>
          <p>{plan.storage} de Almacenamiento</p>
          <p>{plan.users}</p>
          <ul>
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button>Seleccionar Plan</button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
