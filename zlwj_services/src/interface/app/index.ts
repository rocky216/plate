

/* 工具方法 */
export interface Utils {
  OpenNotification:(arg0?:string,arg1?:string)=>void;
  addIndex: (arg0:any[])=> any[];
}

/* 公有组件Props接口 */
export interface IProps {
  history?:any;
  actions?:any;
  match?:any;
  location?: any;
  spinning?: boolean,
  utils: Utils
}