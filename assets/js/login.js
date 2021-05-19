const from = document.querySelector('#form');
const loginBtn = document.querySelector('.js-loginBtn');
const usernameInput = document.querySelector('.js-userName');
const passwordInput = document.querySelector('.js-password');

const app = {
    data: {
        url: 'https://vue3-course-api.hexschool.io',
        userObj: {
            username,
            password
        }
    },
    login(e) {
        e.preventDefault();
        // 將 input value 內容加到 userObj 內
        this.data.userObj.username =  usernameInput.value.trim();
        this.data.userObj.password =  passwordInput.value.trim();

        if (this.data.userObj.username !== "" && this.data.userObj.password !== "") {

            const url = `${this.data.url}/admin/signin`;

            axios.post(url, this.data.userObj)
                .then((res) => {
                    // console.log(res);
                    if (res.data.success) {
                        // 顯示訊息
                        showResponse(res.data.message);
                        // 轉址到 admin.html
                        window.location = 'admin.html';
                        const {
                            token,
                            expired
                        } = res.data;
                        // 將 token 存入 cookie 內
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    } else {
                        // 顯示訊息
                        showResponse(res.data.message);
                    }
                    // console.log(res);
                    // 清除 input 內容
                    from.reset();
                }).catch((error) => {
                    console.log(error);
                });
        }
    },
    created() {
        loginBtn.addEventListener('click', this.login.bind(this));
    }
}
app.created();