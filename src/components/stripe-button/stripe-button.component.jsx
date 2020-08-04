import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    // stripe want the price in cents
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51HCFtAKNXl4sKBTwUjq2Vf37fu6U7pko5ZhG0SFOYjyRLUkAnFWAqziclsZRDySld9ql38ImmKI4r3LZSpQWuKyL00LMafCER1";

    const onToken = (token) => {
        console.log(token);
        alert("Payment Successful");
    };
    return (
        <StripeCheckout
            label="Pay Now"
            name="Dhen Clothing"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is ₱${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            currency="PHP"
            stripeKey={publishableKey}
        ></StripeCheckout>
    );
};

export default StripeCheckoutButton;
