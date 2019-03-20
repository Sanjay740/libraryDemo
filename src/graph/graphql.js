const itemTemplate = `{
    WORD
}`

const listWords = `
    query listWords($limit: Int $nxtToken: String) {
        listMagic1S(limit: $limit nextToken: $nxtToken) {
            items ${itemTemplate}
        }
    }
`

const addBook = `
mutation createBooks($createbooksinput: CreateBooksInput!) {
    createBooks(input: $createbooksinput) {
      id
      title
      author
      year
      image
      inStock
      description
    }
  }`

const listBooks = `query listBooks {
    listBooks {
      items {
        id
        title
        author
        year
        image
        inStock
        description
      }
    }
  }`

const getBookById = `
query fetchBook($id : ID!){
    getBooks(id : $id)
    {
      id
      title 
      inStock
      year
      description
      author
    }
  }
`
const updateBook =`
mutation UpdateBooks($UpdateBooksInput : UpdateBooksInput!) {
    updateBooks(input: $UpdateBooksInput) {
        title
        author
        year
        inStock
        description
  }
}`

const assignedBook = `
mutation createAssignedBook($createassigninput: CreateAssignedBookInput!) {
  createAssignedBook(input: $createassigninput) {
    id
    userId
  currentDate
  dateOfReturn
  bookId
  isBookAssigned
   
  }
}`


export default {
    listBooks,addBook,getBookById ,updateBook,assignedBook
}