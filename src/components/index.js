import React, { Component } from 'react';
import '../App.css';
import booksData from '../fakeData';

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
      booksData: []
    }
  }
  componentDidMount() {
    this.setState({ booksData: booksData });
  }

  assignBook(bookId) {

  }

  render() {
    const bookList =
      <table>
        <TableHeader />
        <tbody>
          {this.state.booksData.map(book => (
            <tr key={book.id}>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.Year}</td>
              <td><button onClick={() => this.assignBook(book.id)}>Assign</button></td>
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
      </div>
    );
  }
}

export default App;