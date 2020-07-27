using Newtonsoft.Json;

namespace ApiAppFunction.Models
{
    public partial class Product
    {
        [JsonProperty(PropertyName = "ProductRowId")]
        public int ProductRowId { get; set; }
        [JsonProperty(PropertyName = "ProductId")]
        public string ProductId { get; set; }
        [JsonProperty(PropertyName = "ProductName")]
        public string ProductName { get; set; }
        [JsonProperty(PropertyName = "CategoryName")]
        public string CategoryName { get; set; }
        [JsonProperty(PropertyName = "Manufacturer")]
        public string Manufacturer { get; set; }
        [JsonProperty(PropertyName = "Description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "BasePrice")]
        public int BasePrice { get; set; }
    }
}
