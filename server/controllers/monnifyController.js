import axios from "axios";
import Payment from "../models/paymentModel.js";


const getToken = async () => {
    const credentials = Buffer.from(
        `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const response = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
        {},
        {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        }
    );

    return response.data.responseBody.accessToken;
};

export const initializeTransaction = async (req, res) => {
    try {
        const { customerName, customerEmail, amount, paymentReference } = req.body;
        const token = await getToken();

        const newPaymentDetails = await Payment.create({
            customerName,
            customerEmail,
            amount,
            paymentReference
        })


        const data = {
            amount,
            customerName,
            customerEmail,
            paymentReference,
            paymentDescription: "Payment for goods/services",
            currencyCode: "NGN",
            contractCode: process.env.MONNIFY_CONTRACT_CODE,
            redirectUrl: "http://localhost:5173/payment-success", // optional
            paymentMethods: ["CARD", "ACCOUNT_TRANSFER"]
        };

        const response = await axios.post(
            `${process.env.MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.status(200).json(response.data);
        console .log("Payment initialized successfully:", response.data, newPaymentDetails);
    } catch (error) {
        console.error("Monnify Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Payment Initialization Failed" });
    }
};


export const webhookHandler = async (req, res) => {
    try {
        console.log("Webhook received:", req.body);

        if (req.body.eventType === "SUCCESSFUL_TRANSACTION") {
            const ref = req.body.eventData.paymentReference;
            const amount = req.body.eventData.amountPaid;

            console.log(`💰 Payment received! Ref: ${ref}, Amount: ₦${amount}`);
            // Save to DB or update user status here
        }
        res.status(200).json({message: "Webhook received successfully"}); 

    } catch (error) {
        console.error("Webhook Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Webhook Processing Failed" });
    }
};

export const getPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await Payment.find({});
        res.status(200).json(paymentDetails);
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({ error: "Failed to fetch payment details" });
    }
}