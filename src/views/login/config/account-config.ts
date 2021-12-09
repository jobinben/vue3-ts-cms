const rules = {
  name: [
    {
      required: true,
      message: '用户名必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{4,10}$/,
      message: '用户名必须在4-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}

export { rules }
