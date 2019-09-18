import React from "react"
import {createStackNavigator, createAppContainer } from "react-navigation"
import {primaryColor} from "@/config"
import TabNavigate from "@/routers/tabNavigate"
import DoorPage from "@/views/Door"
import VisitorPage from "@/views/Door/visitor"
import DiscussPage from "@/views/Discuss"
import DiscussDetailPage from "@/views/Discuss/detail"
import GovernmentPage from "@/views/Government"
import GovernmentDetailPage from "@/views/Government/detail"
import FacePage from "@/views/Face"
import DeviceListPage from "@/views/Face/deviceList"
import CardPage from "@/views/Card"
import LicensePage from "@/views/License"
import LicenseDetailPage from "@/views/License/detail"
import AddVistorLicensePage from "@/views/License/addVistorLicense"
import AddLicensePage from "@/views/License/addLicense"
import MonitorPage from "@/views/Monitor"
import PassListPage from "@/views/Home/passList"
import ScanPage from "@/views/Home/scan"
import EditUserInfoPage from "@/views/Users/editUserInfo"
import GuaranteePage from "@/views/Guarantee"
import ReleaseGuaranteePage from "@/views/Guarantee/releaseGuarantee"
import GuaranteeDetailPage from "@/views/Guarantee/detail"
import ResealeComplaintPage from "@/views/Complaint/resealeComplaint"
import HouseInfoPage from "@/views/Users/houseInfo"
import uploadFacePage from "@/views/Face/uploadFace"
import ModifyPasswordPage from "@/views/Users/modifyPassword"
import NoticePage from "@/views/Notice"


const appStack = createStackNavigator({
  MainTab: {
    screen: TabNavigate,
    navigationOptions: {
      header:null
    }
  },
  Door: DoorPage,
  Visitor: VisitorPage,
  Discuss: DiscussPage,
  DiscussDetail: DiscussDetailPage,
  Government: GovernmentPage,
  GovernmentDetail: GovernmentDetailPage,
  Face: FacePage,
  DeviceList: DeviceListPage,
  Card: CardPage,
  License: LicensePage,
  LicenseDetail: LicenseDetailPage,
  AddVistorLicense: AddVistorLicensePage,
  AddLicense: AddLicensePage,
  Monitor: MonitorPage,
  PassList: PassListPage,
  Scan: ScanPage,
  EditUserInfo: EditUserInfoPage,
  Guarantee: GuaranteePage,
  GuaranteeDetail: GuaranteeDetailPage,
  ReleaseGuarantee: ReleaseGuaranteePage,
  ResealeComplaint: ResealeComplaintPage,
  HouseInfo: HouseInfoPage,
  UploadFace: uploadFacePage,
  ModifyPassword: ModifyPasswordPage,
  Notice: NoticePage
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: primaryColor
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "normal",
      fontSize: 18
    }
  }
})

export default createAppContainer(appStack)