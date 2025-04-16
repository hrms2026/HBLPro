

using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Erp.Server.Repository
{
    public class LeaveRequestRepository : ILeaveRequest
    {
        private DBContext db;
        public LeaveRequestRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateLeaveRequest(LeaveRequest leaverequest)
        {

            Trace.WriteLine(JsonConvert.SerializeObject(leaverequest));

            DbResult result=new DbResult();
            var lr_id = new SqlParameter("lr_id", leaverequest.lr_id + "");
            var lr_user = new SqlParameter("lr_user",leaverequest.lr_user + "");
            var lr_department = new SqlParameter("lr_department", leaverequest.lr_department + "");
            var lr_designation = new SqlParameter("lr_designation", leaverequest.lr_designation + "");
            var lr_leave_type = new SqlParameter("lr_leave_type", leaverequest.lr_leave_type + "");
            var lr_leave_from = new SqlParameter("lr_leave_from", leaverequest.lr_leave_from + "");
            var lr_leave_to = new SqlParameter("lr_leave_to", leaverequest.lr_leave_to + "");
            var lr_leave_days = new SqlParameter("lr_leave_days", leaverequest.lr_leave_days + "");
            var lr_contact_details = new SqlParameter("lr_contact_details", leaverequest.lr_contact_details + "");
            var lr_phone = new SqlParameter("lr_phone", leaverequest.lr_phone + "");
            var lr_address = new SqlParameter("lr_address", leaverequest.lr_address + "");
            var lr_reason = new SqlParameter("lr_reason", leaverequest.lr_reason + "");
            var lr_status = new SqlParameter("lr_status", leaverequest.lr_status + "");
            var lr_cre_by = new SqlParameter("lr_cre_by", leaverequest.lr_cre_by + "");


            result = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateLeaveRequest @lr_id,@lr_user,@lr_department,@lr_designation,@lr_leave_type,@lr_leave_from,@lr_leave_to,@lr_leave_days,@lr_contact_details,@lr_phone,@lr_address,@lr_reason,@lr_status,@lr_cre_by;",
                lr_id, lr_user, lr_department, lr_designation, lr_leave_type, lr_leave_from, lr_leave_to, lr_leave_days, lr_contact_details, lr_phone, lr_address, lr_reason, lr_status, lr_cre_by).ToList().FirstOrDefault() ?? new DbResult();
          
            return result;
        }

        public DbResult deleteLeaveRequest(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteLeaveRequest @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult approveLeaveRequest(RequestParams requestParams)
        {
            var _id = new SqlParameter("id", requestParams.id + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.approveLeaveRequest @id,@user;", _id, _user).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult rejectLeaveRequest(RequestParams requestParams)
        {
            var _id = new SqlParameter("id", requestParams.id + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.rejectLeaveRequest @id,@user;", _id, _user).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }




        public LeaveRequest getLeaveRequest(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var leaverequest = db.Set<LeaveRequest>().FromSqlRaw("EXEC dbo.getLeaveRequest @id;", _id).ToList().FirstOrDefault() ?? new LeaveRequest();
            return leaverequest;
        }

 

        public List<LeaveRequest> getLeaveRequests()
        {
            var leaverequests = db.Set<LeaveRequest>().FromSqlRaw("EXEC dbo.getLeaveRequests;").ToList();
            return leaverequests;
        }

        public List<LeaveRequest> getLeaveRequestsForApprovals(RequestParams requestParms)
        {
            var _id = new SqlParameter("id", requestParms.id + "");
            var leaverequests = db.Set<LeaveRequest>().FromSqlRaw("EXEC dbo.getLeaveRequestsForApprovals @id;", _id).ToList();
            return leaverequests;
        }

        public List<LeaveApprovalHistory> getApprovalHistory(int lr_id)
        {
            var _lr_id = new SqlParameter("lr_id", lr_id + "");
            var leaveRequests = db.Set<LeaveApprovalHistory>().FromSqlRaw("EXEC dbo.getApprovalHistory @lr_id;", _lr_id).ToList();
            return leaveRequests;
        }
    }
}

