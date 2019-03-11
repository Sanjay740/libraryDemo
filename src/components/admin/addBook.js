import React, { Component } from 'react'
import './admin.css';
import { addBook,resetbookData,editBook,updateBook } from '../../action/adminAction'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      message: '',
      bookName: '', authorName: '', inStock: '', year: '', description: ''
    }
    this.baseState = this.state
  }

  componentWillReceiveProps(nextProps)
  {  
    if(!!this.props.match.params.id && !nextProps.books.isBookAdded)
    {
      let data = nextProps.books.editedbookData
      this.setState({bookName :data.title ,authorName :data.author,inStock:data.inStock,year:data.year,description :data.description})
    }
    else if(!!this.props.match.params.id && !!nextProps.books.isBookAdded){
      this.props.dispatch(resetbookData())
      this.props.history.push('/adminDashboard');
    }
    else if(nextProps.books.isBookAdded) {
      this.props.dispatch(resetbookData())
      this.props.history.push('/adminDashboard');
    }
  }
 
  componentDidMount() {   
    if (this.props.auth.userType != 'user' && !!this.props.auth.isUserAuthenticate) {
     if(this.props.match.params.id != undefined)
     {
       this.props.dispatch(editBook(this.props.match.params.id))
     }
    }
    else {
      this.props.history.push('/');
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  selectImages = (event) => {
    
    // console.log(event.target.files.item(0))
     let images = []
    //  for (var i = 0; i < event.target.files.length; i++) {
       images[0] = event.target.files.item(0);
    //  }
     images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
     let message = `${images.length} valid image(s) selected`;
     this.setState({images : images,message});
    // this.setState({ images, message })
  }

  submit = (event) => {
    event.preventDefault();
    if(!this.props.match.params.id )
    {
    const uploaders = this.state.images.map(image => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('filename', image.name)
    formData.append('data', JSON.stringify(this.state))
    this.props.dispatch(addBook(formData))    
  })
}
else
{
  let obj = {
    id :this.props.match.params.id,
    data : this.state
  }
  this.props.dispatch(updateBook(obj))
}
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

            <label ><b>In Stock</b></label>
                    <input type="text" value={this.state.inStock} onChange={this.handleChange.bind(this)} placeholder="Enter In Stock" name="inStock" />

            <label ><b>Year of Publish </b></label>
            <input type="text" value={this.state.year} onChange={this.handleChange.bind(this)} placeholder="Enter year of publish" name="year" />

            {!this.props.match.params.id ? <label ><b>Image</b></label> :null }
            {!this.props.match.params.id ? <input type='file' onChange={this.selectImages} placeholder="select image" name="images" />: null}
      {!this.props.match.params.id ?<p className="text-info">{this.state.message}</p> :null }

            <label ><b>Description</b></label>
            <input type="text" value={this.state.description} onChange={this.handleChange.bind(this)} placeholder="Enter description" name="description" />

          {!!this.props.match.params.id ? <button type="submit" onClick={this.submit.bind(this)} >Update</button> : <button type="submit" onClick={this.submit.bind(this)} >Submit</button> }

          </div>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth.loginCredential,
  books : state.books
})


export default connect(mapStateToProps)(AddBook)