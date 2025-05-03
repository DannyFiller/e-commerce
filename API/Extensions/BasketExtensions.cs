using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto toDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Prouduct.Name,
                Price = x.Prouduct.Price,
                Brand = x.Prouduct.Brand,
                Type = x.Prouduct.Type,
                PictureUrl = x.Prouduct.PictureUrl,
                Quantity = x.Quantity,
            }).ToList()
        };
    }
}
