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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      booksData: [],
      visible: false,
      previewData: {}
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
      <table>
        <TableHeader />
        <tbody>
          {this.state.booksData.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td><button onClick={() => this.assignBook(book)}>Preview</button></td>
            </tr>

          ))}
        </tbody>
      </table>

    return (
      <div className="App">
        <header className="App-header">
          <img src={'two-books-11546981096wqgpcixe1y.png'} className="App-logo" />
          <p>
            WelCome Guest
          </p>
        </header>
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