using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class OutletType
    {
        public int OutletTypeId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
    }
}