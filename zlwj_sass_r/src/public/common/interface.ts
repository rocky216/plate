
export interface UtilsProps {
  OpenNotification:Function;
  addIndex: (arg1:any[],arg2?:boolean)=>any[];
  Pagination: (arg1:any,arg2:(...arg0:any)=>void )=>any;
  getToken: ()=>any;
  submitFiles: (arg1:any[])=>string
}

export interface IProps {
  hostory:any;
  actions: any;
  utils: UtilsProps;
  spinning: boolean;
}

export interface IState {
  app: any;
  company: any;
}