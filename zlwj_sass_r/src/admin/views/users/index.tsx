import React from "react"
import { connect } from "react-redux";
import {Button, Card, Input, Select, Table} from "antd"
import {usersColumns} from "./columns"
import JCard from "@admin/components/JCard"
import { PlusOutlined } from "@ant-design/icons";
import Search from "@admin/components/Submit/Search"


let params = {
  name: "as",
  name1: "",
}

class UsersPage extends React.Component {


  render() {
    return (
      <JCard spinning={false}>
        <div key="a">
          <Search 
            before={<Button type="primary" icon={<PlusOutlined />}>新增</Button>} 
            initialValues={params}
            data={[
              {label: "姓名", name: "name", type: Input},
              {label: "姓名1", name: "name1", type: Input},
            ]}
            handleSearch={(values:any)=>{
              console.log(values)
            }}
          />
        </div>
        <div key="b">
          <Card size="small"  >
            <Table size="small" columns={usersColumns} />
          </Card>
        </div>
      </JCard>
    );
  }

}

export default connect()(UsersPage)