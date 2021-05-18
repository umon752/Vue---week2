const from = document.querySelector('#form');
const loginBtn = document.querySelector('.js-loginBtn');

const app = {
    login(e) {
        e.preventDefault();
        let username = document.querySelector('.js-userName').value.trim();
        let password = document.querySelector('.js-password').value.trim();

        if (username !== "" && password !== "") {
            let userObj = {
                username,
                password
            };

            axios.post(`${url}/admin/signin`, userObj)
                .then((res) => {
                    // console.log(res);
                    // 在 cookie 內設定 token
                    const {
                        token,
                        expired
                    } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    // 顯示訊息
                    showResponse(res.data.message);
                    // 清除 input 內容
                    from.reset();
                });
        }
    },
    created() {
        loginBtn.addEventListener('click', this.login);
    }
}
app.created();