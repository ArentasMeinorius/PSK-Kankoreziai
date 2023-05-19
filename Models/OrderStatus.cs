namespace Kankoreziai.Models;

public enum OrderStatus
{
    AwaitingPayment,
    PaymentAccepted,
    PaymentRejected,
    BeingPrepared,
    WaitingForPickup,
    Completed
}
