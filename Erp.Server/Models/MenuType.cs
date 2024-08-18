using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class MenuType
    {
         [Key]
         public int id { get; set; }
         public string menuType { get; set; } = string.Empty;

    }
}
