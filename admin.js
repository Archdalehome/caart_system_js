// 检查登录状态
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

// 退出登录
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

// 添加产品
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
        title: formData.get('title'),
        price: formData.get('price'),
        image: formData.get('image')
    };
    
    // 获取现有产品
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    
    alert('产品添加成功！');
    e.target.reset();
});

// 添加用户
document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    // 获取现有用户
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('用户添加成功！');
    e.target.reset();
});