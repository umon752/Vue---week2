const modalDeleteBtn = document.querySelector(".js-deleteProduct");

const app = {
    data: {
        url: 'https://vue3-course-api.hexschool.io',
        path: 'umon752',
        productsData: [],
        productObj: {
            data: {}
        }
    },
    getProductsData() {
        const url = `${this.data.url}/api/${this.data.path}/admin/products`;
        axios.get(url)
            .then(res => {
                // console.log(res);
                if (res.data.success) {
                    this.data.productsData = res.data.products;
                    // 渲染產品列表
                    this.renderProductsData();
                } else {
                    // 顯示訊息
                    showResponse('尚未登入，請重新登入');
                    // 轉址到 login.html
                    window.location = 'login.html';
                }
            }).catch((error) => {
                console.log(error);
            });
    },
    deleteProductsData(e) {
        const productId = e.target.dataset.id;
        const url = `${this.data.url}/api/${this.data.path}/admin/product/${productId}`;
        axios.delete(url)
            .then(res => {
                // console.log(res);
                if (res.data.success) {
                    // 顯示訊息
                    showResponse(res.data.message);
                    // 取得產品資料
                    this.getProductsData();
                } else {
                    // 顯示訊息
                    showResponse(res.data.message);
                }
            }).catch((error) => {
                console.log(error);
            });
    },
    openModal(e) {
        modalDeleteBtn.dataset.id = e.target.dataset.id;
    },
    editProductsData(e) {
        // 產品狀態
        const productId = e.target.dataset.status;
        if (productId) {
            this.data.productsData.forEach((item) => {
                if (productId === item.id) {
                    this.data.productObj.data = item;
                    this.data.productObj.data.is_enabled = !this.data.productObj.data.is_enabled;
                }
            });

            const url = `${this.data.url}/api/${this.data.path}/admin/product/${productId}`;
            axios.put(url, this.data.productObj)
                .then(res => {
                    // console.log(res);
                    if (res.data.success) {
                        this.getProductsData();
                        // 顯示訊息
                        showResponse(res.data.message);
                    } else {
                        // 顯示訊息
                        showResponse(res.data.message);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
    },
    renderProductsData() {
        const productList = document.querySelector('#productList');
        const productCount = document.querySelector('#productCount');

        // let str = '';
        // this.data.productsData.forEach((item, index) => {
        //     str += `<tr>
        //         <td>${item.title}</td>
        //         <td width="120">
        //         ${item.origin_price}
        //         </td>
        //         <td width="120">
        //         ${item.price}
        //         </td>
        //         <td width="100">
        //         <div class="form-check form-switch">
        //             <input class="form-check-input" type="checkbox" id="${index}" ${item.is_enabled ? 'checked' : ''} data-status="${index}">
        //             <label class="form-check-label ${item.is_enabled ? 'text-primary' : 'text-secondary'}" for="${index}" data-status="${index}">${item.is_enabled ? '啟用' : '未啟用'}</label>
        //         </div>
        //         </td>
        //         <td width="120">
        //             <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
        //                 data-action="remove" data-id="${item.id}">刪除</button>
        //         </td>
        //     </tr>`;
        // });

        // map 回傳為陣列形式，使用 join('') 將陣列轉為字串
        const str = this.data.productsData.map((item, index) =>
            `<tr>
            <td>${item.title}</td>
            <td width="120">
            ${item.origin_price}
            </td>
            <td width="120">
            ${item.price}
            </td>
            <td width="100">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-status="${item.id}">
                <label class="form-check-label ${item.is_enabled ? 'text-primary' : 'text-secondary'}" for="${item.id}" data-status="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
            </div>
            </td>
            <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                    data-action="remove" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modal">刪除</button>
            </td>
        </tr>`
        ).join('');
        productList.innerHTML = str;
        productCount.textContent = this.data.productsData.length;
        // 將 this 轉為指向 app 物件 (這裡的 this 原本是指向 productList 這個 DOM 元素)
        // modal 確認按鈕監聽
        modalDeleteBtn.addEventListener('click', this.deleteProductsData.bind(this));

        // 刪除按鈕監聽
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach((item) => {
            item.addEventListener('click', this.openModal);
        })

        // 狀態按鈕監聽
        const statusBtn = document.querySelectorAll('.form-switch');
        statusBtn.forEach((item) => {
            item.addEventListener('click', this.editProductsData.bind(this));
        })
    },
    created() {
        // 取出儲存在瀏覽器 cookie 裡面的 token 憑證
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;
        // 取得產品資料
        this.getProductsData();
    }
}

app.created();