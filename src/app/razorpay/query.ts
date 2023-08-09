import { gql } from "@apollo/client";

export const Payment_Order = gql`
  mutation CreatePaymentOrder($amount: Float!, $currency: String!) {
    createPaymentOrder(amount: $amount, currency: $currency) {
      amount
      id
      orderId
    }
  }
`;
