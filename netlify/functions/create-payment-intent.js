require("dotenv").config();
const stripe = require("stripe")("sk_test_51NPo7KFo62KQR86lcPhoDt4DsTI97SwsVmRnIyQ6jzAQ708wfPiWbUTxuBUeALgdsmNrGNoCkKp4t5RGHfGpKaiZ00Wrn3LuYm");
//${process.env.REACT_APP_STRIPE_SECERET_KEY}
exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    } catch(error) {
        console.log({ error });

        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};