namespace Kankoreziai.Models;

[Flags]
public enum ProductSeason
{
    None = 0,
    Spring = 1,
    Summer = 2,
    Autumn = 4,
    Winter = 8,
    AllSeason = Spring | Summer | Autumn | Winter
}