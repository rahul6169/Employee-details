import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Payment_Order } from "./query";

declare const Razorpay: any;

export const RazorpayPayment = () => {
  const [value, setValue] = useState("");
  const [initOrder] = useMutation(Payment_Order);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value === "") {
      alert("enter amount");
    } else {
      initOrder({
        variables: { amount: Number(value), currency: "INR" },
      }).then(({ data }) => {
        console.log(data?.createPaymentOrder?.orderId);
        let options: any = {
          key_id: "rzp_test_4xcvSagUAjt2Wl",
          key_secret: "uUEZBl3mMDAklV5qn11Z471H",
          name: "Rahul",
          amount: data?.createPaymentOrder?.amount,
          currency: "INR",
          order_id: data?.createPaymentOrder?.orderId,
          receipt: "order_rcptid_11",
          notes: {
            id: data?.createPaymentOrder?.id,
          },
          theme: {
            image_padding: false,
            color: "#00804A",
          },
        };
        options = {
          ...options,
          handler: (response: any) => {
            console.log(response, "responseresponse");
          },
        };

        const razorpay = new Razorpay(options);

        razorpay.open();
      });
    }
  };

  return (
    <>
      <h2>Razorpay payment</h2>
      <input
        type="text"
        placeholder="enter amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>pay</button>
    </>
  );
};
