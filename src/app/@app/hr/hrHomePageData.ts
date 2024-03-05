// LeavesSegment: [
//   {
//     default: true,
//     includeIcon: true,
//     iconFamily: "fad",
//     icon: "create",
//     text:"To Submit",
//     key: "toSubmit",
//     class: "pending-icon"
//   },
//   {
//     default: false,
//     includeIcon: true,
//     iconFamily: "fad",
//     icon: "alert-circle",
//     text:"Pending",
//     key: "pending",
//     class: "pending-icon"
//   },
//   {
//     default: false,
//     includeIcon: true,
//     iconFamily: "fad",
//     icon: "checkmark-circle",
//     text:"Approved",
//     key: "approved",
//     class: "accepted-icon"
//   },
//   {
//     default: false,
//     includeIcon: true,
//     iconFamily: "fad",
//     icon: "close-circle",
//     text:"Rejected",
//     key: "rejected",
//     class: "rejected-icon"
//   }
// ]
export const actions ={
  clockIn:"clockIn",
  clockOut:"clockout",
  openAttendance:"openAttendance",
  openLeaves:"openLeaves",
  openPayslips:"openPayslips",
  targets:"targets",
  appraisals:"appraisals",
  jobDescription:"jobDescription",
  policiesProcedures:"policiesProcedures",
  ldPlan:"ldPlan",
  byMonth:"byMonth",
  review:"review",
  penalty:"penalty",
  leaves:"leaves",
  leavesToApprove:"leavesToApprove",
  leavesBalance:"leavesBalance",
  toBeSubmitted:"toSubmit",
  pending:"pending",
  approved:"approved",
  rejected:"rejected"
}
export const HrHomePageData = {
  timeSegment: [
    {
      text: "Clock In",
      iconFamily: "fad",
      icon: "log-in",
      action: actions.clockIn,
      show: true
    },
    {
      text: "Clock Out",
      iconFamily: "fad",
      icon: "log-out",
      action: actions.clockOut,
      show: true
    },
    {
      text: "Attendance",
      iconFamily: "fad",
      icon: "time",
      action: actions.openAttendance,
      show: true
    },
    {
      text: "Leaves",
      iconFamily: "fad",
      icon: "calendar",
      action: actions.openLeaves,
      show: true
    },
    {
      text: "Payslips",
      iconFamily: "fad",
      icon: "cash",
      action: actions.openPayslips,
      show: true
    },
  ],
  devSegment: [
    {
      text: "Targets",
      iconFamily: "fad",
      icon: "disc",
      action: actions.targets,
      show: true
    },
    {
      text: "Appraisals",
      iconFamily: "fad",
      icon: "star-half",
      action: actions.appraisals,
      show: true
    },
    {
      text: "Job description",
      iconFamily: "fad",
      icon: "create",
      action: actions.jobDescription,
      show: true
    },
    {
      text: "Policies & Procedures",
      iconFamily: "fad",
      icon: "clipboard",
      action: actions.policiesProcedures,
      show: true
    },
    {
      text: "L&D plan",
      iconFamily: "fad",
      icon: "bicycle",
      action: actions.ldPlan,
      show: true
    },
  ],
  segment: [
    {
      default: true,
      includeIcon: true,
      textRequired:false,
      iconFamily: "fad",
      icon: "time",
      key: "time",
      text:"time"
    },
    {
      default: true,
      includeIcon: true,
      textRequired:false,
      iconFamily: "fad",
      icon: "person",
      key: "profile",
      text:"profile"
    }
  ],
  contactSegments:[
    {
      default: false,
      includeIcon: true,
      textRequired:false,
      iconFamily: "fad",
      icon: "barbell",
      key: "programs",
      text:"programs"
    },
    {
      default: true,
      includeIcon: true,
      textRequired:false,
      iconFamily: "fad",
      icon: "person",
      key: "profile",
      text:"profile"
    }
  ],
  attendanceButtons: [
    {
      text: "By Month",
      iconFamily: "fad",
      icon: "calendar",
      action: actions.byMonth,
      show: true
    },
    {
      text: "Review",
      iconFamily: "fad",
      icon: "checkbox",
      action: actions.review,
      show: true
    },
    {
      text: "Penalty",
      iconFamily: "fad",
      icon: "warning",
      action: actions.penalty,
      show: true
    },
  ],
  leavesButtons: [
    {
      text: "Leaves",
      iconFamily: "fad",
      icon: "time",
      action: actions.leaves,
      show: true
    },
    {
      text: "Leaves To Approve",
      iconFamily: "fad",
      icon: "checkbox",
      action: actions.leavesToApprove,
      show: true,
      hasNotification:false
    },
    {
      text: "Leaves Balance",
      iconFamily: "fad",
      icon: "wallet",
      action: actions.leavesBalance,
      show: true
    },
  ],
  LeavesSegment: [
    {
      default: true,
      includeIcon: true,
      textRequired:true,
      iconFamily: "fad",
      icon: "create",
      text:"To Submit",
      key: actions.toBeSubmitted,
      class: "pending-icon"
    },
    {
      default: false,
      includeIcon: true,
      textRequired:true,
      iconFamily: "fad",
      icon: "alert-circle",
      text:"Pending",
      key: actions.pending,
      class: "pending-icon"
    },
    {
      default: false,
      includeIcon: true,
      textRequired:true,
      iconFamily: "fad",
      icon: "checkmark-circle",
      text:"Approved",
      key: actions.approved,
      class: "accepted-icon"
    },
    {
      default: false,
      includeIcon: true,
      textRequired:true,
      iconFamily: "fad",
      icon: "close-circle",
      text:"Rejected",
      key: actions.rejected,
      class: "rejected-icon"
    }
  ],
  actionsList: [
    {
      text: "My profile",
      action: "profile"
    },
    {
      text: "Change password",
      action: "change-password"
    },
    {
      text: "Change language",
      action: "change-language"
    },
    {
      text: "Logout",
      action: "logout"
    },

  ]
}

