using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IonicResearch.Data.Migrations
{
    public partial class Outlet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OutletProducts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BarCode = table.Column<string>(maxLength: 20, nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletProducts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OutletTypes",
                columns: table => new
                {
                    OutletTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletTypes", x => x.OutletTypeId);
                });

            migrationBuilder.CreateTable(
                name: "OutletForms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RepDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Inn = table.Column<string>(maxLength: 200, nullable: true),
                    Address = table.Column<string>(maxLength: 200, nullable: true),
                    OpeningTime = table.Column<long>(nullable: false),
                    Latitude = table.Column<double>(nullable: true),
                    Longitude = table.Column<double>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    OutletTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OutletForms_OutletTypes_OutletTypeId",
                        column: x => x.OutletTypeId,
                        principalTable: "OutletTypes",
                        principalColumn: "OutletTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OutletForms_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OutletFormProducts",
                columns: table => new
                {
                    FormId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletFormProducts", x => new { x.FormId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_OutletFormProducts_OutletForms_FormId",
                        column: x => x.FormId,
                        principalTable: "OutletForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OutletFormProducts_OutletProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "OutletProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OutletPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Path = table.Column<string>(maxLength: 1000, nullable: true),
                    FormId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OutletPhotos_OutletForms_FormId",
                        column: x => x.FormId,
                        principalTable: "OutletForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OutletFormProducts_ProductId",
                table: "OutletFormProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OutletForms_OutletTypeId",
                table: "OutletForms",
                column: "OutletTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_OutletForms_UserId",
                table: "OutletForms",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OutletPhotos_FormId",
                table: "OutletPhotos",
                column: "FormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OutletFormProducts");

            migrationBuilder.DropTable(
                name: "OutletPhotos");

            migrationBuilder.DropTable(
                name: "OutletProducts");

            migrationBuilder.DropTable(
                name: "OutletForms");

            migrationBuilder.DropTable(
                name: "OutletTypes");
        }
    }
}
