namespace IonicResearch.Data.Dtos
{
    public class FiasAddressObjectDto
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FormalName { get; set; }
        public string ShortName { get; set; }
        public int Level { get; set; }
    }
}