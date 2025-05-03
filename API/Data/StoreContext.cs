using System;
using System.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Migrations;

public class StoreContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
}
