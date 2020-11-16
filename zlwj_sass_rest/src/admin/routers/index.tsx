import React from 'react';
import {Switch, Route} from "react-router-dom"
import ErrorPage from "@common/views/auth/error"
import routerData from '@admin/routers/routerData';





class Routers extends React.Component {
  render() {
    return (
      <Switch>
        {routerData.map((item, index)=>(
          <Route key={index} exact={item.exact} path={item.path} component={item.component}  />
        ))}
        
        
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default Routers;


// import React from "react";
// import Loadable from "react-loadable";
// import { Spin } from "antd";

// //通用的过场组件
// const MyLoadingComponent = ({ isLoading, error }: any) => {
//   // Handle the loading state
//   if (isLoading) {
//     return (
//       <div
//         className="loading-page"
//         style={{
//           height: "400px",
//           width: "100%",
//           textAlign: "center",
//           padding: "80px 50px"
//         }}
//       >
//         <Spin />
//       </div>
//     );
//   }
//   // Handle the error state
//   else if (error) {
//     console.log("IBG: MyLoadingComponent -> error", error);
//     return <div>Sorry, there was a problem loading the page.</div>;
//   } else {
//     return null;
//   }
// };

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
// export default (loader: any, loading: any = MyLoadingComponent) => {
//   return Loadable({
//     loader,
//     loading
//   });
// };