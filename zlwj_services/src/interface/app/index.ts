

/* 工具方法 */
export interface Utils {
  OpenNotification:(arg0?:string,arg1?:string)=>void;
  addIndex: any;
  normFileSingle: (arg0:any[])=> any[];
  normFileMulti: (arg0:any[])=> any[];
  submitFiles: (arg0:any[])=> any[];
  Pagination:any;
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