export default  {
    signUpConfig : {
    hideAllDefaults :true,
     signUpFields: [
       {
      label : 'Username',
      key: 'username',
      required: true,
      displayOrder: 1,
      type:'string',
      custom: false,
    },
    {
      label : 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type:'password',
      custom: false,
    },
    {
      label : 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type:'string',
      custom: false,
    },
    {
      label : 'User Type',
      key: 'custom:usertype',
      required: true,
      displayOrder: 4,
      type:'string',
      custom: true,
    }]
  }
}