/**
 * Pending: This is the initial state when the user places an order. The system has received the order, but it has not yet been processed or confirmed.
 * Processing: Once the order is acknowledged and being prepared for shipment, it enters the processing state. This stage involves activities such as verifying payment, checking stock availability, and preparing the items for shipping.
 * Confirmed: The order has been successfully processed, and the user receives a confirmation that their purchase has been confirmed. At this point, the items are ready to be shipped.
 * Shipped: The items have been handed over to the shipping carrier or logistics company for delivery. The user might receive a tracking number to monitor the shipment's progress.
 * In Transit: The items are on their way to the user's specified delivery address. The user can track the package's movement using the provided tracking information.
 * Out for Delivery: The package is with the local delivery driver and is expected to be delivered to the user's address on that day.
 * Delivered: The package has been successfully delivered to the user's address, and they may receive a notification confirming the delivery. At this point, the order is considered complete.
 * Cancelled: If the user cancels the order before it's processed or if there are issues with payment or availability, the order may be cancelled. The user would receive notification of the cancellation.
 * Returned: After receiving the items, if the user decides to return them due to issues like defects or dissatisfaction, the order may enter the "returned" state. The return process, including any required inspections, takes place during this stage.
 * Refunded: Once the returned items are inspected and the return is approved, a refund is initiated. The user's payment is reimbursed through the original payment method.
 * Completed: This state indicates that the entire order process, including delivery and any necessary returns/refunds, has been completed successfully.
 */

export enum OrderState {
  PENDING = 'pending',
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  SHIPPED = 'Shipped',
  IN_TRANSIT = 'in-transit',
  OUT_FOR_DELIVERY = 'out-for-delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
  REFUNDED = 'refunded',
  COMPLETED = 'completed',
}
