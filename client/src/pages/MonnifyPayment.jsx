import { useEffect, useState } from "react";
import "./MonnifyPayment.css"; // Assuming you have a CSS file for styling

const MonnifyPayment = () => {
  const [loading, setLoading] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentReference = `DEX_REF_${Date.now()}`;

    try {
      setLoading(true)
      const res = await fetch("https://87ade58c9e91.ngrok-free.app/api/monnify/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          amount: Number(form.amount),
          paymentReference,
        }),
      });

      const data = await res.json();

      if (data.responseBody?.checkoutUrl) {
        window.location.href = data.responseBody.checkoutUrl;
      } else {
        alert("Something went wrong with payment");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Error occurred during payment.");
    }finally{
      setLoading(false)
      setForm({
        customerName: "",
        customerEmail: "",
        amount: "",
      });
    }
  }

  // Render the payment details history
  useEffect(() => {
  const fetchPaymentHistory = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/monnify/get");
      const data = await res.json();
      setPaymentHistory(data);
      console.log("Payment History:", data);
     } catch (err) {
      console.error("Error fetching payment history:", err);
    }
  }

  fetchPaymentHistory();
},[loading]);

  return (
    <>
    <form onSubmit={handlePayment} className="payment-form">
      <h2>Monnify Payment</h2>

      <input
        type="text"
        name="customerName"
        placeholder="Your Name"
        value={form.customerName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="customerEmail"
        placeholder="Your Email"
        value={form.customerEmail}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount (NGN)"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <button type="submit">{!loading ? "Pay Now" : "Loading"}</button>
    </form>
    <div className="payment-history">
      <h2>Payment History</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Email</th>
                <th>Amount (NGN)</th>
                <th>Payment Reference</th>
              </tr>
            </thead>
            <tbody>
            {
              paymentHistory.map((payment, index) => {
                return (
                  <tr key={index}>
                    <td>{payment.customerName}</td>
                    <td>{payment.customerEmail}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentReference}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
    </div>
    </>
  );
};

export default MonnifyPayment;
