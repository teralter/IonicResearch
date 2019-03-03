using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IonicResearch.Data.Migrations
{
    public partial class FiasTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FiasAddressObjects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ParentId = table.Column<int>(nullable: true),
                    FormalName = table.Column<string>(maxLength: 120, nullable: true),
                    ShortName = table.Column<string>(maxLength: 10, nullable: true),
                    Level = table.Column<int>(nullable: false),
                    AoGuid = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FiasAddressObjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FiasAddressObjects_FiasAddressObjects_ParentId",
                        column: x => x.ParentId,
                        principalTable: "FiasAddressObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FiasHouses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AddressObjectId = table.Column<int>(nullable: false),
                    HouseNum = table.Column<string>(maxLength: 20, nullable: true),
                    BuildNum = table.Column<string>(maxLength: 10, nullable: true),
                    StructNum = table.Column<string>(maxLength: 10, nullable: true),
                    HouseGuid = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FiasHouses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FiasHouses_FiasAddressObjects_AddressObjectId",
                        column: x => x.AddressObjectId,
                        principalTable: "FiasAddressObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FiasAddressObjects_AoGuid",
                table: "FiasAddressObjects",
                column: "AoGuid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FiasAddressObjects_ParentId",
                table: "FiasAddressObjects",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_FiasHouses_AddressObjectId",
                table: "FiasHouses",
                column: "AddressObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_FiasHouses_HouseGuid",
                table: "FiasHouses",
                column: "HouseGuid",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FiasHouses");

            migrationBuilder.DropTable(
                name: "FiasAddressObjects");
        }
    }
}
