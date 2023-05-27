namespace Kankoreziai.Models;

public enum OrderStatus
{
    Created,
    AwaitingPayment,
    PaymentAccepted,
    PaymentRejected,
    BeingPrepared,
    WaitingForPickup,
    Completed
}
