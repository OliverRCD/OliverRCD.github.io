// 1）创建一个用户表，插入若干记录，设计一个用户登录
// 框，要求界面美观，可使用antdesign表单或使用html
// 样式。创建一个存储过程，判断登录框中的用户是否存在，
// 其密码是否正确。
import React, { Component } from 'react';
import { Button, Input, Space,Alert } from 'antd';
import { reqdoSQL } from '../../../api/functions';

class Cx0526 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:'',
      passWord:'',
      data:[]
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.login = this.login.bind(this);
    this.passwordRef = React.createRef();
  }
  inputChange=(e)=>{
    // console.log(e.target);
    let a=e.target.id
    this.setState({[a]:e.target.value},console.log(this.state))
  }
  async handleBlur(e) {
    // console.log(e);
    let {userId,data}=this.state
    console.log(userId,'失去焦点');
    if(userId){
      let p={}
      p.userid=userId 
      p.password=''
      p.key='1'
      p.sqlprocedure='xp1'
      let rs=await reqdoSQL(p)
      console.log(rs.rows[0].idvalue,'id:',userId);
      if(rs.rows[0].idvalue!=1){
        alert(rs.rows[0].message)
      }
    }
  }
  async login(){
    let {userId,passWord}=this.state
    if(userId){
      let p={}
      p.userid=userId 
      p.password=passWord
      p.key='2'
      p.sqlprocedure='xp1'
      let rs=await reqdoSQL(p)
      console.log(rs.rows[0].psvalue,'id:',userId,'passWord:',passWord);
      alert(rs.rows[0].message)
      if(rs.rows[0].psvalue!=1)this.setState({passWord:''})
    }
  }
  handleKeyPressUsername = (event) => {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
      this.passwordRef.current.focus();
    }
  };
  handleKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      // Trigger login function
      this.login();
    }
  };
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <div style={styles.title}>登录</div>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input id='userId' style={styles.input} placeholder="输入账号" 
              onChange={this.inputChange}  onBlur={this.handleBlur} 
              onKeyPress={this.handleKeyPressUsername}/>
            <Input.Password id='passWord' style={styles.input} 
              placeholder="输入密码" onChange={this.inputChange} 
              value={this.state.passWord}  onKeyPress={this.handleKeyPress}
              ref={this.passwordRef}/>
            <Button type="primary" style={styles.input} onClick={this.login}>登录</Button>
          </Space>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5', // 背景颜色，可根据需要调整
  },
  box: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff', // 矩形背景颜色
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 添加阴影
    width: '300px', // 设置盒子的宽度
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
  },
  input: {
    width: '100%', // 使输入框占满父容器宽度
  },
};

export default Cx0526;
