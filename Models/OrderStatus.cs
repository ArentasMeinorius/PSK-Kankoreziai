namespace Kankoreziai.Models;

public enum OrderStatus
{
    Cart,
    AwaitingPayment,
    PaymentAccepted,
    PaymentRejected,
    BeingPrepared,
    WaitingForPickup,
    Completed
}
