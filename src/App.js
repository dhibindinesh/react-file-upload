import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        url: ''
      }
  };
  urlChangeHandler=event=>{
    // this.setState({
    //   url: event.value
    // });
    console.log(event)
    this.state.url = document.getElementById('url').value

    console.log('state ::: ',this.state);
  //   console.log(this.validateSize(event));
  //   if(this.validateSize(event)){ 
  //     console.log(file);
  // // if return true allow to setState
  //    this.setState({
  //     selectedFile: file
  //     });

  //   }
  }
  onChangeHandler=event=>{
    var file = event.target.files[0];
    console.log(file);
    console.log(this.validateSize(event));
    if(this.validateSize(event)){ 
      console.log(file);
  // if return true allow to setState
     this.setState({
      selectedFile: file
      });

    }
  }
  fileUploadHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post(this.state.url, data)
      .then(res => { // then print response status
        console.log(res)
        toast.success('upload success')
      })
      .catch(err => { // then print response status
        console.log(err)
        toast.error('upload fail')
      })

  };
  validateSize=(event)=>{
  let file = event.target.files[0];
  let size = 30000;
  let err = '';
  console.log(file.size);
  if (file.size > size) {
   err = file.type+'is too large, please pick a smaller file\n';
   toast.error(err);
 }
 return true
};

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ToastContainer />
              <form method="post" action="#" id="#">
                  <div className="form-group">
                    <label>URL</label>
                    <input type="text" name="url" id="url" className="form-control" onChange={this.urlChangeHandler}></input>
                  </div>
                  <div className="form-group files">
                    <label>Upload Your File </label>
                    <input type="file" name="file" className="form-control" onChange={this.onChangeHandler}/>
                  </div>
                  <div className="col-md-6 pull-right">
                  <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;