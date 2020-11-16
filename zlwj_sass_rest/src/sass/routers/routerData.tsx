import React from "react"
import HomePage from "@sass/views/home"
import TestPage from "@sass/views/home/test"


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