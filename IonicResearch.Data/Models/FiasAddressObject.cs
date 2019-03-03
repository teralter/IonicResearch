using System;
using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
    public class FiasAddressObject
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        [MaxLength(120)]
        public string FormalName { get; set; }
        [MaxLength(10)]
        public string ShortName { get; set; }
        public int Level { get; set; }
        public Guid AoGuid { get; set; }


        public FiasAddressObject Parent { get; set; }
    }
}