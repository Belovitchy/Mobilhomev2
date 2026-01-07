using System;
using System.Collections.Generic;
using Infrastructure.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Infrastructure.Persistence;

public partial class MobilhomeDbContext : DbContext
{
    public MobilhomeDbContext()
    {
    }

    public MobilhomeDbContext(DbContextOptions<MobilhomeDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Link> Links { get; set; }

    public virtual DbSet<Manager> Managers { get; set; }

    public virtual DbSet<Mobilhome> Mobilhomes { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Vacationer> Vacationers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("invoice");

            entity.HasIndex(e => e.OwnerId, "owner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Category)
                .HasColumnType("enum('siblu','manager','utilities','other')")
                .HasColumnName("category");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.Type)
                .HasColumnType("enum('income','outcome')")
                .HasColumnName("type");

            entity.HasOne(d => d.Owner).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("invoice_ibfk_1");
        });

        modelBuilder.Entity<Link>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("link");

            entity.HasIndex(e => e.OwnerId, "owner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.Url)
                .HasMaxLength(255)
                .HasColumnName("url");

            entity.HasOne(d => d.Owner).WithMany(p => p.Links)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("link_ibfk_1");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("manager");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .HasColumnName("firstname");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Telephone)
                .HasMaxLength(20)
                .HasColumnName("telephone");
        });

        modelBuilder.Entity<Mobilhome>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mobilhome");

            entity.HasIndex(e => e.ManagerId, "manager_id");

            entity.HasIndex(e => e.OwnerId, "owner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IcalLink)
                .HasMaxLength(255)
                .HasColumnName("icalLink");
            entity.Property(e => e.ManagerId).HasColumnName("manager_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");

            entity.HasOne(d => d.Manager).WithMany(p => p.Mobilhomes)
                .HasForeignKey(d => d.ManagerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("mobilhome_ibfk_2");

            entity.HasOne(d => d.Owner).WithMany(p => p.Mobilhomes)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("mobilhome_ibfk_1");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("owner");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");

            entity.HasMany(d => d.Managers).WithMany(p => p.Owners)
                .UsingEntity<Dictionary<string, object>>(
                    "OwnerManager",
                    r => r.HasOne<Manager>().WithMany()
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("owner_manager_ibfk_2"),
                    l => l.HasOne<Owner>().WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("owner_manager_ibfk_1"),
                    j =>
                    {
                        j.HasKey("OwnerId", "ManagerId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("owner_manager");
                        j.HasIndex(new[] { "ManagerId" }, "manager_id");
                        j.IndexerProperty<uint>("OwnerId").HasColumnName("owner_id");
                        j.IndexerProperty<uint>("ManagerId").HasColumnName("manager_id");
                    });
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("reservation");

            entity.HasIndex(e => e.MobilhomeId, "mobilhome_id");

            entity.HasIndex(e => e.OwnerId, "owner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.MobilhomeId).HasColumnName("mobilhome_id");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");

            entity.HasOne(d => d.Mobilhome).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.MobilhomeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reservation_ibfk_1");

            entity.HasOne(d => d.Owner).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reservation_ibfk_2");

            entity.HasMany(d => d.Vacationers).WithMany(p => p.Reservations)
                .UsingEntity<Dictionary<string, object>>(
                    "VacationerReservation",
                    r => r.HasOne<Vacationer>().WithMany()
                        .HasForeignKey("VacationerId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("vacationer_reservation_ibfk_2"),
                    l => l.HasOne<Reservation>().WithMany()
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("vacationer_reservation_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ReservationId", "VacationerId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("vacationer_reservation");
                        j.HasIndex(new[] { "VacationerId" }, "vacationer_id");
                        j.IndexerProperty<uint>("ReservationId").HasColumnName("reservation_id");
                        j.IndexerProperty<uint>("VacationerId").HasColumnName("vacationer_id");
                    });
        });

        modelBuilder.Entity<Vacationer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vacationer");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .HasColumnName("firstname");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
