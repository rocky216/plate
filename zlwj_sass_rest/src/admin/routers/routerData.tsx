import React from "react"
import HomePage from "@admin/views/home"
import TestPage from "@admin/views/home/test"


export default [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/test",
    exact: false,
    component: TestPage,
  },
]