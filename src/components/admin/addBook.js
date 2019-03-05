import React, { Component } from 'react'
import './admin.css';
import { addBook } from '../../action/adminAction'
import { connect } from 'react-redux';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      message: '',
      bookName: '', authorName: '', inStock: '', year: '', description: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  selectImages = (event) => {
    console.log(event)
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({ images, message })
  }

  uploadImages = (event) => {
    event.preventDefault();
    const uploaders = this.state.images.map(image => {     
      const data = new FormData();
      data.append("image", image, image.name);
      this.props.dispatch(addBook(data))
      

      // Make an AJAX upload request using Axios
      // return axios.post(BASE_URL + 'upload', data)
      // .then(response => {
      // this.setState({
      // imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
      // });
      // })
    });
    // Once all the files are uploaded 
    // axios.all(uploaders).then(() => {
    // console.log('done');
    // }).catch(err => alert(err.message));
  }


  render() {
    return (
      <div>
        <form className="modal-content">
          <div className="imgcontainer">
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <label ><b>Book Name</b></label>
            <input type="text" value={this.state.bookName} onChange={this.handleChange.bind(this)} placeholder="Enter Book Name" name="bookName" />

            <label ><b>Author Name</b></label>
            <input type="text" value={this.state.authorName} onChange={this.handleChange.bind(this)} placeholder="Enter Author Name" name="authorName" />

            <label ><b>In Stock</b></label>In Stock
                    <input type="text" value={this.state.inStock} onChange={this.handleChange.bind(this)} placeholder="Enter In Stock" name="inStock" />

            <label ><b>Year of Publish </b></label>
            <input type="text" value={this.state.year} onChange={this.handleChange.bind(this)} placeholder="Enter year of publish" name="year" />

            <label ><b>Image</b></label>
            <input type='file' onChange={this.selectImages} placeholder="select image" name="images" />
            <p className="text-info">{this.state.message}</p>
            <label ><b>Description</b></label>
            <input type="text" value={this.state.description} onChange={this.handleChange.bind(this)} placeholder="Enter description" name="description" />

            <button type="submit" onClick={this.uploadImages.bind(this)} >Login</button>

          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth.loginCredential
})
const mapDispatchToProps = (dispatch) => ({
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(AddBook)