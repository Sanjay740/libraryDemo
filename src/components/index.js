import React, { Component } from 'react';
import '../App.css';
import booksData from '../fakeData/booksFakeData';
import Modal from 'react-awesome-modal';

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
    }
  }
  componentDidMount() {
    this.setState({ booksData: booksData });
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
    const bookList =
      <div className="grid-container">
        {this.state.booksData.map(book => (
          <div className="grid-item">
            <div key={book.id} className="imgcontainer">
              <img src={book.image} alt="Avatar" className="image" />
              <div className="middle">
                <div className="text">{book.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    return (
      <div className="App">
        <Header />
        {bookList}       
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

export default App;