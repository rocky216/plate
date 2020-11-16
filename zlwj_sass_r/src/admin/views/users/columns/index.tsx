import { ColumnsType } from 'antd/es/table';

interface ColumsProps {
  title:string;
  dataIndex: string;
  render?:Function
}

export const usersColumns:ColumnsType<ColumsProps> = [
  {
    title: "姓名",
    dataIndex: "key1"
  },
  {
    title: "手机号",
    dataIndex: "key1"
  },
  {
    title: "邮箱",
    dataIndex: "key1"
  },
  {
    title: "任务名称",
    dataIndex: "key1"
  },
  {
    title: "任务名称",
    dataIndex: "key1"
  },
  {
    title: "状态",
    dataIndex: "key1"
  },
]