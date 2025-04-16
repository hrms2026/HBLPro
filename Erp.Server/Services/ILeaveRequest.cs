using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ILeaveRequest
    {
        public List<LeaveRequest> getLeaveRequests();
        LeaveRequest getLeaveRequest(int id);

        List<LeaveApprovalHistory>getApprovalHistory(int lr_id);

        DbResult deleteLeaveRequest(int id);
        DbResult createOrUpdateLeaveRequest(LeaveRequest leaverequest);
        DbResult approveLeaveRequest(RequestParams requestParams);
        DbResult rejectLeaveRequest(RequestParams requestParams);
        List<LeaveRequest> getLeaveRequestsForApprovals(RequestParams requestParms);
    }
}
