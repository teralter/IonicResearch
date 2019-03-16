using Microsoft.EntityFrameworkCore.Migrations;

namespace IonicResearch.Data.Migrations
{
    public partial class OutletTypeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OutletTypeId",
                table: "OutletTypes",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "OutletTypes",
                newName: "OutletTypeId");
        }
    }
}
