import React, { Component } from 'react'

class LoadingContainer extends Component {
  state = {
    content: '加载中...'
  }
  componentDidMount(){
    this.timer = setTimeout(() => {
      this.setState({content: '加载超时，请检查网络！'});
    }, 1000);
  }
  componentWillUnmount(){
    // 清除计时器
    clearTimeout(this.timer);
  }
  render(){
    return (
      this.state.content
    )
  }
}

export default LoadingContainer