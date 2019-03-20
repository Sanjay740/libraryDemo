import React, { Component } from 'react'
import './admin.css';
import { connect } from 'react-redux';
import { fetchAllBook, fetchAllUser,assignBookToUser } from '../../action/adminAction'
import Modal from 'react-awesome-modal';
import AddBook from './addBook'
import { Link } from 'react-router-dom';
// import '../authentication/register.css';
import './returnbook.css';
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
      userData: [],
      userId : "",
      date: "",
      CurrentDate : "",
      assignBookData : {
        bookName: "",
        id: "",
        assignBookStock : ""
      },
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
        this.setState({ userData: nextProps.books.userData })
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
    this.props.history.push('/addBook/' + id);
  }

  assignBook(book) {
   if(book.inStock >0)
   {
    let GivenDates = new Date();
    let currentMonth = GivenDates.getMonth() + 1;
    let currentDate = GivenDates.getDate();
    let currentYear = GivenDates.getFullYear();
    this.setState({ visible: true })
    this.setState({ assignBookData: {bookName : book.title, id: book.id, assignBookStock : book.inStock }, CurrentDate :currentDate+'-'+currentMonth+'-'+currentYear });
  }
  else
  {
    alert('Books are not in stock');
  }

}

  closeModal() {
    this.setState({
      visible: false
    });
    this.setState({ assignBookData: {bookName : "", id: "",assignBookStock : "" },   date : ""});
   this.setState({userId: ""})
  }

  handleChange(event) {
    let GivenDate = event.target.value;
    let CurrentDate = new Date();
    GivenDate = new Date(GivenDate);    
    if(GivenDate > CurrentDate){
      this.setState({date :event.target.value });
    }else{
    alert('Date of return is not smaller and equal to current date.');
    }
    
  }

  submit = (event) => {
    event.preventDefault();
    if(this.state.userId != ""  && this.state.date != "")
    {
    let obj = {
      userId : this.state.userId,
      bookId : this.state.assignBookData.id,
      dateOfReturn: this.state.date,
      currentDate : this.state.CurrentDate,
      assignBookStock : this.state.assignBookData.assignBookStock
    }
    this.props.dispatch(assignBookToUser(obj))
    this.closeModal();
  }
  }

  render() {

    const bookListData =
      <table>
        <TableHeader />
        <tbody>
          {this.state.booksData.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.inStock}</td>
              <td>{book.description}</td>
              <td><Link to={`/addBook/${book.id}`}><i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<i onClick={() => this.assignBook(book)} className="fa fa-book" aria-hidden="true"></i></td>
              {/* <td><i classNameName="fa fa-edit" onClick={() => this.editBook(book._id)}></i> &nbsp;&nbsp;<i classNameName="glyphicon glyphicon-trash"></i></td> */}
            </tr>
          ))}
        </tbody>
      </table>

    return (
      <div>
        <div className="modal-content">
          {bookListData}
        </div>
        <Modal visible={this.state.visible} width="900" height="354" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="container">

            <form >
              <div className="row">
                <div className="col-25">
                  <label htmlFor="country">Book Name</label>
                </div>
                <div className="col-75">              
                  <input type="text" disabled value={this.state.assignBookData.bookName}  placeholder="Enter Book Name" name="bookName" />
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label htmlFor="country">Book Assign To</label>
                </div>
                <div className="col-75">
                  <select className="form-control"
                    // onChange={this.handleChange.bind(this)}
                    onChange={event => this.setState({ userId :event.target.value})}
                    >
                    <option value="">
                      Select User
                   </option>
                    {
                      this.state.userData.map(user => {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Date Of Return</label>
                </div>
                <div className="col-75">
                  <input type="date" value={this.state.date}   onChange={this.handleChange.bind(this)} placeholder="Enter Book Name" name="bookName" />
                </div>
              </div>


              <div className="row">
              <button type="submit" onClick={this.submit.bind(this)}  > Submit</button>
              </div>
            </form>
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