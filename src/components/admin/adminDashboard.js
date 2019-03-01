import React, { Component } from 'react'
import './admin.css';

const TableHeader = () => {
    return (
        <tr>
          <th>Id</th>
          <th>BookName</th>
          <th>Author</th>
          <th>In Stock</th>
          <th>Action</th>
        </tr>
    );
  }
    export default class adminDashboard extends Component {
        render() {
            return (   
                <div className="modal-content">
                <table>
                    <TableHeader />
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
    <td>50</td>
    <td><i className="fa fa-edit"></i> &nbsp;&nbsp;<i className="glyphicon glyphicon-trash"></i></td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
    <td>50</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Adam</td>
    <td>Johnson</td>
    <td>67</td>
    <td>50</td>
    <td>50</td>
  </tr>
</table>
</div>

            )
        }
    }
