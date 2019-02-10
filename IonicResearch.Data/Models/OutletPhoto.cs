using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class OutletPhoto
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string Path { get; set; }
        public int FormId { get; set; }

        public OutletForm Form { get; set; }
    }
}