using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class DbResult
    {
         [Key]
         public int id { get; set; }
         public string message { get; set; } = string.Empty;

    }
}
