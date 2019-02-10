namespace IonicResearch.Data.Models
{
    public class OutletFormProduct
    {
        public int FormId { get; set; }
        public int ProductId { get; set; }

        public OutletForm Form { get; set; }
        public OutletProduct Product { get; set; }
    }
}