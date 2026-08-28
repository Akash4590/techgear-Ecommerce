import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

interface StripeCardFormProps {
  clientSecret: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0B0B14",
      fontFamily: "system-ui, sans-serif",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#EF4444" },
  },
};

const StripeCardForm: React.FC<StripeCardFormProps> = ({
  clientSecret,
  onSuccess,
  onError,
  loading,
  setLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const confirmPayment = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setCardError("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setCardError(error.message || "Payment failed. Please try again.");
      onError(error.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      <div className="rounded-lg border border-gray-200 px-4 py-3.5">
        <CardElement options={cardElementOptions} />
      </div>
      {cardError && <p className="mt-2 text-xs text-red-500">{cardError}</p>}
      <button
        type="button"
        onClick={confirmPayment}
        disabled={!stripe || loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Processing Payment..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default StripeCardForm;