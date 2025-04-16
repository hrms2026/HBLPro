using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILogger<LeaveRequest> logger;
        private readonly ILeaveRequest ileaverequests;
    
        public LeaveRequestController(ILogger<LeaveRequest> _logger,ILeaveRequest _ileaverequests)
        {
            logger = _logger;
            ileaverequests = _ileaverequests;
         
        }
           
        [HttpPost("getLeaveRequests")]
        //[Authorize]
        public List<LeaveRequest> getLeaveRequests()
        {

            List<LeaveRequest> leaverequests = new List<LeaveRequest>();
            leaverequests = ileaverequests.getLeaveRequests();
            return leaverequests;
        }


        [HttpPost("getLeaveRequest")]
       // [Authorize]
        public LeaveRequest getLeaveRequest([FromBody] int id)
        {
            LeaveRequest leaverequest = new LeaveRequest();
            leaverequest = ileaverequests.getLeaveRequest(id);
            return leaverequest;
        }


        [HttpPost("getApprovalHistory")]
        //[Authorize]
        public List<LeaveApprovalHistory> getApprovalHistory([FromBody] int lr_id)
        {

            List<LeaveApprovalHistory> leaveApprovalHistories = new List<LeaveApprovalHistory>();
            leaveApprovalHistories = ileaverequests.getApprovalHistory(lr_id);
            return leaveApprovalHistories;
        }



        [HttpPost("deleteLeaveRequest")]
        //[Authorize]
        public DbResult deleteLeaveRequest([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = ileaverequests.deleteLeaveRequest(id);
            return dbResult;
        }

        [HttpPost("approveLeaveRequest")]
        //   [Authorize]
        public DbResult approveLeaveRequest([FromBody] RequestParams requestParams)
        {
            DbResult dbResult = new DbResult();
            dbResult = ileaverequests.approveLeaveRequest(requestParams);
            return dbResult;
        }

        [HttpPost("rejectLeaveRequest")]
        //   [Authorize]
        public DbResult rejectLeaverequest([FromBody] RequestParams requestParams)
        {
            DbResult dbResult = new DbResult();
            dbResult = ileaverequests.rejectLeaveRequest(requestParams);
            return dbResult;
        }


        [HttpPost("createOrUpdateLeaveRequest")]
       // [Authorize]
        public DbResult createOrUpdateLeaveRequest([FromBody] LeaveRequest leaverequest)
        {
           
            Trace.WriteLine("Datetime  " + leaverequest.lr_leave_from + "  " + leaverequest.lr_leave_to);
            DbResult dbResult = new DbResult();
            dbResult = ileaverequests.createOrUpdateLeaveRequest(leaverequest);
            return dbResult;
        }

        [HttpPost("getLeaveRequestsForApprovals")]
        //[Authorize]
        public List<LeaveRequest> getLeaveRequestsForApprovals([FromBody] RequestParams requestParms)
        {

            List<LeaveRequest> leaverequests = new List<LeaveRequest>();
            leaverequests = ileaverequests.getLeaveRequestsForApprovals(requestParms);
            return leaverequests;
        }

    }
}
