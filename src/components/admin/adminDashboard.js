import React, { Component } from 'react'
import './admin.css';
import { connect } from 'react-redux';
import { fetchAllBook,fetchAllUser } from '../../action/adminAction'
import Modal from 'react-awesome-modal';
import AddBook from './addBook'
import { Link } from 'react-router-dom';
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>BookName</th>
        <th>Author</th>
        <th>In Stock</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

class adminDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      booksData: [],
      imageurl: "https://s3.us-east-2.amazonaws.com/librarydemobucket/libraryDemo/"
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.data != null) {
      if ((!nextProps.auth.isEmailExist) && (!nextProps.auth.success)) {
        this.props.history.push('/');
      }
      else {
        this.setState({ booksData: nextProps.books.booksData })
      }
    }
  }
  componentDidMount() {
    if (this.props.auth.userType != 'user' && !!this.props.auth.isUserAuthenticate) {
      this.props.history.push('/adminDashboard');
      this.props.dispatch(fetchAllBook())
      this.props.dispatch(fetchAllUser())
    }
    else {
      this.props.history.push('/');     
    }
  }

  editBook(id) {
    this.props.history.push('/addBook/'+id);   
  }

  assignBook(id) {
    this.setState({visible :true})
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {   

    const bookListData =
      <table>
        <TableHeader />
        <tbody>
          {this.state.booksData.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.inStock}</td>
              <td>{book.description}</td>
              <td><Link to={`/addBook/${book._id}`}><i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<i onClick={() => this.assignBook(book._id)} className="fa fa-book" aria-hidden="true"></i></td>
              {/* <td><i className="fa fa-edit" onClick={() => this.editBook(book._id)}></i> &nbsp;&nbsp;<i className="glyphicon glyphicon-trash"></i></td> */}
            </tr>
          ))}
        </tbody>
      </table>

    return (
      <div>
      <div className="modal-content">      
      {bookListData}     
      </div>
     <Modal visible={this.state.visible} width="900" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
     <div>
      Book Title: <input type="text" className="modalinput" name="lname" disabled /><br />
     </div>
   </Modal>
   </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth.loginCredential,
  books: state.books
})


export default connect(mapStateToProps)(adminDashboard);