using System;
using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class FiasHouse
    {
        public int Id { get; set; }
        public int AddressObjectId { get; set; }
        [MaxLength(20)]
        public string HouseNum { get; set; }
        [MaxLength(10)]
        public string BuildNum { get; set; }
        [MaxLength(10)]
        public string StructNum { get; set; }
        public Guid HouseGuid { get; set; }

        public FiasAddressObject AddressObject { get; set; }
    }
}