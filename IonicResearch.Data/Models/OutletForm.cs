using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class OutletForm
    {
        public int Id { get; set; }
        public DateTime RepDate { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string Inn { get; set; }
        [MaxLength(200)]
        public string Address { get; set; }
        public long OpeningTime { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public int OutletTypeId { get; set; }

        public User User { get; set; }
        public OutletType Type { get; set; }
        public List<OutletFormProduct> FormProducts { get; set; }
        public List<OutletPhoto> Photos { get; set; }
    }
}