using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Security.Cryptography;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentsController : ControllerBase
    {
        private readonly ILogger<Attachment> logger;
        private readonly IAttachments iattachments;
    
        public AttachmentsController(ILogger<Attachment> _logger,IAttachments _iattachments)
        {
            logger = _logger;
            iattachments = _iattachments;
         
        }
           
        [HttpPost("getAttachments")]
        //[Authorize]
        public List<Attachments> getAttachments()
        {

            List<Attachments> attachments = new List<Attachments>();
            attachments = iattachments.getAttachments();
            return attachments;
        }


        [HttpPost("getAttachment")]
       // [Authorize]
        public Attachments getAttachment([FromBody] int id)
        {
            Attachments attachment = new Attachments();
            attachment = iattachments.getAttachment(id);
            return attachment;
        }

        [HttpPost("deleteAttachment")]
        //[Authorize]
        public DbResult deleteAttachment([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iattachments.deleteAttachment(id);
            return dbResult;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file selected.");

            // Generate a random hexadecimal filename with original file extension
            string fileExtension = Path.GetExtension(file.FileName); // e.g., ".pdf"
            string randomFileName = GenerateRandomHex(30) + fileExtension;

            var folder = "UploadedFiles";
            Directory.CreateDirectory(folder); // Ensure directory exists

            var filePath = Path.Combine(folder, randomFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok("File uploaded successfully.");
        }

        // Utility function to generate random hex string
        private string GenerateRandomHex(int length)
        {
            var bytes = new byte[length / 2];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }






        [HttpPost("createOrUpdateAttachment")]
        // [Authorize]
        public DbResult createOrUpdateAttachment([FromBody] Attachments attachment)
        {
            DbResult dbResult = new DbResult();
            dbResult = iattachments.createOrUpdateAttachment(attachment);
            return dbResult;
        }
        
    }
}
