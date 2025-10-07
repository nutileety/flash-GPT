import Stripe from 'stripe';
import Transaction from '../models/Transaction.js'
import User from '../models/user.js'

export const stripewebhooks = async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers['stripe-signature']

    let event;
    try{
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    }
    catch(error) {
        return response.status(400).send(`Webhook error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                })

                const session = sessionList.data[0];
                const { transactionId, appId } = session.metadata;
                console.log(session)

                if(appId === 'flashgpt') {
                    const transaction = await Transaction.findOne({
                        _id: transactionId,
                        isPaid: false
                    })
                    console.log(transaction)

                    // update user account credits
                    await User.updateOne({
                        _id: transaction.userId
                    },
                    {
                        $inc: {
                            credits: transaction.credits
                        }
                    })

                    // update transaction
                    transaction.isPaid = true;
                    await transaction.save();
                }
                else {
                    return response.json({ recieved: true, message: "Ignored evenet: Invalid app."});
                }
                break;
            }  
        
            default:
                console.log("Unhandled event type: ", event.type);
                break;
        }
        return response.json({recieved: true})

    }
    catch(error) {
        console.error('Webhook processing error: ', error);
        return response.status(500).send("Internal server error")
    }
}