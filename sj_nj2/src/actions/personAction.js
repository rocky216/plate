import {START_LOADING_PERSON, END_LOADING_PERSON, START_LOADING_PERSON_ONE, END_LOADING_PERSON_ONE, END_NOLOADING_PERSON} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"

export function quitAnalysisDetailGNd(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/quitAnalysisDetailGNd",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function quitAnalysisDetailGj(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/quitAnalysisDetailGj",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function quitAnalysisDetailFl(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/quitAnalysisDetailFl",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function quitAnalysisDetailCj(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/quitAnalysisDetailCj",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function personnelAttendanceStatistics(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/personnelAttendanceStatistics/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        personstatis: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function overWorkAnalysis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/overWorkAnalysis",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function AttendanceAnalysiss(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/attendanceAnalysis",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function overtimeTrendAnalysisM(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/overtimeTrendAnalysisM/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function overtimeTrendAnalysisW(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/overtimeTrendAnalysisW/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function overtimeTrendAnalysisDay(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/overtimeTrendAnalysisDay/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function attendanceTrendAnalysisM(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/attendanceTrendAnalysisM/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function attendanceTrendAnalysisW(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/attendanceTrendAnalysisW/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function attendanceTrendAnalysisDay(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hAttendanceAnalysis/attendanceTrendAnalysisDay/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getMonthPlanFormW(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/loadPlanFormW/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getMonthPlanFormM(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/loadPlanFormM/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getDayPlanFormDay(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/loadPlanFormDay/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function quitAnalysis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/quitAnalysis",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function employeeSourceDistribute(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/employeeSourceDistribute",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function updateEmployeeNotice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/employeeNotice/update/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function employeeNoticeInit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/employeeNotice/init/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getHResourceAnalysisDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/hResourceAnalysis/hResourceAnalysisDetail",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getEmployeeCensus(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON_ONE
    })

    try{
      const options = { 
        url: "/api/pc/hResourceAnalysis/employeeCensus",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON_ONE,
        employal: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON_ONE,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function loadMAttendanceInit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/attendance/loadMAttendanceInit/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        monthAttend: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteAttend(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/attendance/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function approvalOverWork(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/work/approval/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function updateOverworkTemporaryStatus(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/workDetail/updateTemporaryStatus/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getApprovalWork(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/workDetail/approvalWork/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getOverWork(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/workDetail/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        overwork: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON,
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addAttendance(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/attendance/addAttendance/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getLookFlow(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/flow/template/flow/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function approvalAbsenceS(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/approval/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function updateTemporaryStatus(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/updateTemporaryStatus/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getApprovalLook(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/approvalLook/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getAttendanceInit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/attendance/loadAttendanceInit/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getAttend(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/attendance/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        attend:data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteAbsence(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function goCancel(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/absenceCancel/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getAbsenceDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/absenceCancel/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addAbsenceOperation(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/absenceOperation/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getEmployeeDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadEmployee/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getAbsence(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/absence/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        absence: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deletePostsRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeTransferPosition/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getPostsRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeTransferPosition/getApprovalRecord/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addStaffTransferPosition(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeTransferPosition/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaffTransferPosition(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeTransferPosition/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        staffpos: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaffQuitDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeQuit/flow/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getScheduDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/loadLastPlan/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteSchedu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function editSchedu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getScheduDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSchedu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        schedu: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addSchedu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/plan/batchPlan/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getQuitRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeQuit/flow/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function loadSelectDeptByRoleSchedu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDeptByRole",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function loadSelectDeptByRole(params, next){
  return async function(dispatch, getState){
    // dispatch({
    //   type: START_LOADING_PERSON
    // })

    try{
      const options = {
        url: "/api/pc/loadSelectDeptByRole",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      // dispatch({
      //   type: END_LOADING_PERSON,
      // })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function editStaffAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/updateEmployeeAccountPassword/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({ 
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addStaffAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/addEmployeeAccount/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaffAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/selectEmployeeAccount/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteQuitStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeQuit/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getQuitStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeQuit/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        quitStaff: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addQuitStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employeeQuit/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getProcessList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/flow/template/byOrgan/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function editEmployee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaffDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getTeach(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/dept/selectEmployyeeTreeDeptList/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        treeDept: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addEmployee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectRole",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectDeptList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDept",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectDeptNotSmall(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDeptNotSmall",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        deptNotsmall: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      console.log(data)
      dispatch({
        type: END_LOADING_PERSON,
        staff: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}


export function getEmployeeDict(params, next){
  return async function(dispatch, getState){
    // dispatch({
    //   type: START_LOADING_PERSON
    // })

    try{
      const options = {
        url: "/api/pc/employee/loadEmployeeDict/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_NOLOADING_PERSON,
        employeedict: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}