import React, { Component } from 'react';
import './admin.css';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>BookName</th>
        <th>Author</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

class assignBook extends Component {

  

  render() {
    return (
      <div>
         <table>
        <TableHeader />
        {/* <tbody>
          {this.state.booksData.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.inStock}</td>
              <td>{book.description}</td>
              <td><Link to={`/addBook/${book.id}`}><i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<i onClick={() => this.assignBook(book)} className="fa fa-book" aria-hidden="true"></i></td> */}
              {/* <td><i classNameName="fa fa-edit" onClick={() => this.editBook(book._id)}></i> &nbsp;&nbsp;<i classNameName="glyphicon glyphicon-trash"></i></td> */}
            {/* </tr> */}
          {/* ))} */}
        {/* </tbody> */}
      </table>
      </div>
            );
    }
  }

export default assignBook;
