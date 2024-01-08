// Import the PayPal JavaScript SDK
import { loadScript } from '@paypal/paypal-js';

// Function to create a PayPal payment
const createPaypalPayment = async (amount) => {
    // Load the PayPal JavaScript SDK
    const paypalSDK = await loadScript({
        'client-id': 'Ae87zPjhTUhhLKNxm7P2vb2XsOEwdyVt6d05tJ8Yxdg70syKfOpZwws_gq67bayyMN0ev240dSZmBE_O',
        currency: 'USD',
    });

    // Create a PayPal payment
    const paypal = paypalSDK.PayPal();

    const payment = await paypal.createPayment({
        amount: amount,
        intent: 'capture',
        // Add other payment options if needed
    });

    // Redirect the user to the PayPal payment page
    window.location.href = payment.links.find(link => link.rel === 'approve').href;
};

// Usage example
const amount = 10; // Replace with the actual amount from the previous component
createPaypalPayment(amount);
