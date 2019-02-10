using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class OutletProduct
    {

        public int Id { get; set; }
        [MaxLength(20)]
        public string BarCode { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
    }
}