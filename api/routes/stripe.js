const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51O8m9dIGXFF06g4u3uSUJQ2hVoEH7V3LUDZa75uUfqZ7qERJ39eDZqdCsbmcC7ksusako67dY3xIw4tf03JpSk0Z00H6xkJjwN');

router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });


module.exports=router;