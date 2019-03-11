import React, { Component } from 'react';
import '../App.css';
// import booksData from '../fakeData/booksFakeData';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { fetchAllBook } from '../action/adminAction'
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Author</th>
        <th>Published Date</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

const Header = () => {
  return (
    <div className="container">
      <img src={'notebook.jpg'} className="App-logo" />
      {/* <img src={this.state.image} alt="Notebook" style="width:100%;"></img> */}
      <div className="content">
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei.</p>
      </div>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      booksData: [],
      visible: false,
      previewData: {},
      imageurl: "https://s3.us-east-2.amazonaws.com/librarydemobucket/libraryDemo/"
    }
  }
  componentWillReceiveProps(nextProps)
  {
    if (nextProps.books != null) {      
        this.setState({ booksData: nextProps.books.booksData })     
    }
  }
  componentDidMount() {
   if(this.props.auth.userType != 'user' && !!this.props.auth.isUserAuthenticate)
   {
    this.props.history.push('/adminDashboard');
   }
   else
   {
    this.props.history.push('/');
    this.props.dispatch(fetchAllBook())
   }
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  assignBook(book) {
    this.setState({
      previewData: book,
      visible: true
    });
  }

  render() {
    const bookListData =
      <div className="row col4Padding">
        {this.state.booksData.map(book => (
          <div key={book._id} className="col-sm-4">
            <div className="grid-item">
              <div className="imgcontainer">
                <img src={this.state.imageurl + book.image} alt="Avatar" className="image" />
                <div className="middle">
                  <div  className="text">
                  <span >{book.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          {bookListData}
        </div>

        <Modal visible={this.state.visible} width="600" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
            <h1>{this.state.previewData.title}</h1>
            <hr></hr>
            <div className="imageDiv">
              <img className="modalImage" src={this.state.previewData.image} />
            </div>
            <div>Description: {this.state.previewData.description}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.loginCredential,
  books: state.books
})

export default connect(mapStateToProps)(App);