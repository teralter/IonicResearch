using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class OutletType
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
    }
}