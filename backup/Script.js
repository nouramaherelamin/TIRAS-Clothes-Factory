// ===============================================
// DATA STRUCTURES (Simulating Database via LocalStorage)
// ===============================================
let products = JSON.parse(localStorage.getItem('products')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || {};
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let qcRecords = JSON.parse(localStorage.getItem('qcRecords')) || [];
let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
let cart = [];

// DOM Elements
const customerSection = document.getElementById('customer-section');
const adminSection = document.getElementById('admin-section');
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const orderList = document.getElementById('order-list');
const productListAdmin = document.getElementById('product-list-admin');
const inventoryList = document.getElementById('inventory-list');
const adminOrderList = document.getElementById('admin-order-list');
const qcList = document.getElementById('qc-list');
const qcProductSelect = document.getElementById('qc-product');
const deliveryList = document.getElementById('delivery-list');
const analyticsData = document.getElementById('analytics-data');

// ===============================================
// INITIAL SETUP (Seed Data & Navigation)
// ===============================================

function seedInitialData() {
    // Check if products array is empty
    if (products.length === 0) {
        products = [
            {
                id: '1678825800001',
                name: 'Classic Green T-Shirt',
                type: 'T-Shirt',
                size: 'M',
                color: 'Green',
                season: 'Summer',
                // رابط الصورة للقميص 
                image: 'https://via.placeholder.com/300x220/2ecc71/FFFFFF?text=Green+Shirt' 
            },
            {
                id: '1678825800002',
                name: 'Slim Fit Blue Jeans',
                type: 'Jeans',
                size: 'L',
                color: 'Blue',
                season: 'Autumn',
                // رابط الصورة للجينز
                image: 'https://via.placeholder.com/300x220/3498db/FFFFFF?text=Blue+Jeans' 
            },
            {
                id: '1678825800003',
                name: 'Elegant Red Dress',
                type: 'Dress',
                size: 'S',
                color: 'Red',
                season: 'Winter',
                // رابط الصورة للفستان
                image: 'https://via.placeholder.com/300x220/e74c3c/FFFFFF?text=Red+Dress' 
            }
        ];
        inventory['1678825800001'] = 15;
        inventory['1678825800002'] = 8;
        inventory['1678825800003'] = 2; // Low stock example
        
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
}

// Navigation Handlers
document.getElementById('customer-view').addEventListener('click', () => {
    customerSection.classList.add('active');
    adminSection.classList.remove('active');
    renderProducts();
    renderOrders();
});

document.getElementById('admin-login').addEventListener('click', () => {
    const password = prompt('Enter admin password (use "admin"):');
    if (password === 'admin') { 
        customerSection.classList.remove('active');
        adminSection.classList.add('active');
        loadAdminData();
    } else if (password) {
        alert('Incorrect password.');
    }
});

// Admin Tab Setup
function setupAdminTabs() {
    const tabs = document.querySelectorAll('.dashboard-tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('#dashboard-content .tab-content').forEach(c => c.classList.remove('active'));

            // Add 'active' to the clicked tab
            tab.classList.add('active');

            // Show the corresponding content
            const targetId = tab.getAttribute('data-tab') + '-tab';
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Reload data specific to the active tab
            if (targetId === 'products-tab') renderProductsAdmin();
            if (targetId === 'inventory-tab') renderInventory();
            if (targetId === 'orders-tab') renderAdminOrders();
            if (targetId === 'qc-tab') renderQC();
            if (targetId === 'delivery-tab') renderDeliveries();
            if (targetId === 'analytics-tab') renderAnalytics();
        });
    });

    // Set default active tab (Product Classification)
    document.querySelector('.dashboard-tabs .tab[data-tab="products"]').click();
}


// ===============================================
// CUSTOMER FUNCTIONS (E-COMMERCE)
// ===============================================

// Render Products with Images
function renderProducts(filterType = '', filterSize = '', filterColor = '') {
    productList.innerHTML = '';
    products.filter(p => 
        (!filterType || p.type === filterType) &&
        (!filterSize || p.size === filterSize) &&
        (!filterColor || p.color === filterColor)
    ).forEach(product => {
        const stock = inventory[product.id] || 0;
        const disabled = stock <= 0 ? 'disabled' : '';
        const li = document.createElement('li');
        li.className = 'product-item';
        
        // هنا يتم عرض الصورة باستخدام الرابط المخزن
        li.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/300x220?text=Image+Missing'}" alt="${product.name}">
            <div class="product-details">
                <h4>${product.name}</h4>
                <p>Type: ${product.type} | Size: ${product.size} | Color: ${product.color}</p>
                <p>Stock: <strong>${stock > 0 ? stock : 'Out of Stock'}</strong></p>
                <button onclick="addToCart('${product.id}')" ${disabled}>Add to Cart</button>
            </div>
        `;
        productList.appendChild(li);
    });
}

// Cart Logic
// Making addToCart a global function (attached to window) so HTML can call it
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const currentCartCount = cart.filter(item => item.id === productId).length;
    const stock = inventory[productId] || 0;

    if (currentCartCount < stock) {
        cart.push(product);
        renderCart();
    } else {
        alert('Cannot add more; item is out of stock or you have reached the current stock limit.');
    }
}

function renderCart() {
    cartItems.innerHTML = '';
    const itemCounts = {};
    cart.forEach(item => {
        itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });

    // Display cart items with counts
    Object.keys(itemCounts).forEach(productId => {
        const product = products.find(p => p.id === productId);
        const count = itemCounts[productId];
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `${product.name} (x${count}) <button onclick="removeOneFromCart('${productId}')">Remove One</button>`;
        cartItems.appendChild(li);
    });
    
    document.getElementById('place-order').disabled = cart.length === 0;
}

// Making removeOneFromCart a global function
window.removeOneFromCart = function(productId) {
    const index = cart.map(item => item.id).lastIndexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

// Place Order Logic (Transaction & Inventory Update)
document.getElementById('place-order').addEventListener('click', () => {
    if (cart.length === 0) return alert('Cart is empty!');
    
    const tempInventory = { ...inventory };
    let canPlaceOrder = true;
    
    const itemCounts = cart.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    }, {});

    for (const productId in itemCounts) {
        if ((tempInventory[productId] || 0) < itemCounts[productId]) {
            canPlaceOrder = false;
            alert(`Order failed: Insufficient stock for ${products.find(p => p.id === productId)?.name || 'an item'}.`);
            break;
        }
    }

    if (canPlaceOrder) {
        // Update Inventory
        for (const productId in itemCounts) {
            tempInventory[productId] -= itemCounts[productId];
        }

        inventory = tempInventory;
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Create Order
        const order = { id: Date.now(), items: [...cart], status: 'Pending', date: new Date().toLocaleDateString() };
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        cart = [];
        
        // Re-render
        renderCart();
        renderOrders();
        renderProducts(); 
        alert('Order successfully placed! You can track it below.');
    }
});

// Customer Order Tracking
function renderOrders() {
    orderList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.className = 'order-item';
        li.innerHTML = `Order ${order.id}: ${order.items.map(i => i.name).join(', ')} - Status: <strong>${order.status}</strong>`;
        orderList.appendChild(li);
    });
}

// Filter Bindings
document.getElementById('filter-type').addEventListener('change', updateFilter);
document.getElementById('filter-size').addEventListener('change', updateFilter);
document.getElementById('filter-color').addEventListener('change', updateFilter);

function updateFilter() {
    const type = document.getElementById('filter-type').value;
    const size = document.getElementById('filter-size').value;
    const color = document.getElementById('filter-color').value;
    renderProducts(type, size, color);
}

// ===============================================
// ADMIN FUNCTIONS (ERP BACKEND)
// ===============================================

function loadAdminData() {
    // This function will eventually load all necessary admin data upon login
}

// Product Classification
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = Date.now().toString();
    const product = {
        id: productId,
        name: document.getElementById('product-name').value,
        type: document.getElementById('product-type').value,
        size: document.getElementById('product-size').value,
        color: document.getElementById('product-color').value,
        season: document.getElementById('product-season').value,
        image: document.getElementById('product-image').value
    };
    products.push(product);
    inventory[product.id] = 10; // Default stock
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    renderProductsAdmin(); // Admin List
    renderInventory();     // Stock Update
    renderProducts();      // Customer View Update
    e.target.reset();
});

function renderProductsAdmin() {
    productListAdmin.innerHTML = '';
    qcProductSelect.innerHTML = '<option value="">Select Product</option>';
    
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        // Displaying Image URL for admin verification
        li.innerHTML = `<strong>${product.name}</strong> (ID: ${product.id.substring(0, 8)}...)<br>
                        Details: ${product.type}, ${product.size}, ${product.color} | Image URL: ${product.image}`; 
        productListAdmin.appendChild(li);

        // Populate QC Select dropdown
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        qcProductSelect.appendChild(option);
    });
}

// Inventory Management
function renderInventory() {
    inventoryList.innerHTML = '';
    let lowStock = [];
    products.forEach(product => {
        const stock = inventory[product.id] || 0;
        if (stock < 5) lowStock.push(product.name);
        const li = document.createElement('li');
        li.className = 'inventory-item';
        li.innerHTML = `${product.name}: <strong>${stock}</strong> in stock ${stock < 5 ? '(Low Stock)' : ''}`;
        inventoryList.appendChild(li);
    });
    document.getElementById('low-stock-alert').textContent = lowStock.length ? `⚠️ Low Stock Alert: ${lowStock.join(', ')}` : '✅ All Stock Levels are healthy.';
}

// Order Management
function renderAdminOrders() {
    adminOrderList.innerHTML = '';
    orders.sort((a, b) => b.id - a.id).forEach(order => { // Show newest first
        const li = document.createElement('li');
        li.className = 'order-item';
        li.innerHTML = `
            <div style="flex-grow: 1;">Order ID: <strong>${order.id}</strong> (${order.date})<br>
            Items: ${order.items.map(i => i.name).join(', ')}</div>
            Status: 
            <select onchange="updateOrderStatus(${order.id}, this.value)">
                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${order.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            </select>`;
        adminOrderList.appendChild(li);
    });
}

// Making updateOrderStatus a global function
window.updateOrderStatus = function(orderId, status) {
    const order = orders.find(o => o.id == orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        renderOrders(); // Update Customer View
        renderAdminOrders(); // Update Admin View

        // Auto-assign delivery on Ship status
        if (status === 'Shipped' && !deliveries.find(d => d.orderId == orderId)) {
            deliveries.push({ 
                orderId, 
                driver: 'Delivery Driver ' + (Math.floor(Math.random() * 3) + 1), 
                route: 'Route ' + (Math.random() < 0.5 ? 'North' : 'South'), 
                date: new Date().toLocaleDateString() 
            });
            localStorage.setItem('deliveries', JSON.stringify(deliveries));
            renderDeliveries();
        }
        renderAnalytics();
    }
}

// Quality Control
document.getElementById('qc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const record = {
        productId: document.getElementById('qc-product').value,
        status: document.getElementById('qc-status').value,
        notes: document.getElementById('qc-notes').value,
        date: new Date().toLocaleDateString()
    };
    qcRecords.push(record);
    localStorage.setItem('qcRecords', JSON.stringify(qcRecords));
    renderQC();
    e.target.reset();
});

function renderQC() {
    qcList.innerHTML = '';
    qcRecords.slice().reverse().forEach(record => { // Show newest first
        const product = products.find(p => p.id === record.productId);
        const productName = product ? product.name : `Product ID: ${record.productId.substring(0, 4)}...`;
        const color = record.status === 'Rejected' ? '#c0392b' : '#16a085';
        const li = document.createElement('li');
        li.className = 'qc-item';
        li.style.borderLeft = `5px solid ${color}`;
        li.innerHTML = `<strong>${productName}</strong> (${record.date}): Status <strong style="color: ${color};">${record.status}</strong> - ${record.notes || 'No notes provided'}`;
        qcList.appendChild(li);
    });
}

// Delivery Module
function renderDeliveries() {
    deliveryList.innerHTML = '';
    deliveries.forEach(delivery => {
        const li = document.createElement('li');
        li.className = 'delivery-item';
        li.innerHTML = `Order ${delivery.orderId} (on ${delivery.date}): Assigned to <strong>${delivery.driver}</strong>, Route: <strong>${delivery.route}</strong>`;
        deliveryList.appendChild(li);
    });
}

// Analytics Dashboard
function renderAnalytics() {
    const totalOrders = orders.length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
    const rejectionCount = qcRecords.filter(r => r.status === 'Rejected').length;
    
    const bestSellers = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            bestSellers[item.id] = (bestSellers[item.id] || 0) + 1;
        });
    });

    const bestSellerArray = Object.keys(bestSellers).map(productId => {
        const product = products.find(p => p.id === productId);
        return { 
            name: product ? product.name : 'Unknown', 
            count: bestSellers[productId] 
        };
    }).sort((a, b) => b.count - a.count);

    const top3 = bestSellerArray.slice(0, 3);
    const conversionRate = totalOrders > 0 ? ((shippedOrders / totalOrders) * 100).toFixed(1) : 0;

    analyticsData.innerHTML = `
        <p>📊 <strong>Total Orders Placed:</strong> ${totalOrders}</p>
        <p>✅ <strong>Orders Shipped:</strong> ${shippedOrders}</p>
        <p>📉 <strong>Order Fulfillment Rate:</strong> ${conversionRate}%</p>
        <p>❌ <strong>Total QC Rejections:</strong> ${rejectionCount}</p>
        <br>
        <p>⭐ <strong>Top 3 Best Sellers:</strong></p>
        <ol>
            ${top3.map(item => `<li>${item.name} (${item.count} sold)</li>`).join('')}
        </ol>
    `;
}

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    seedInitialData();
    renderProducts();
    renderOrders(); 
    setupAdminTabs(); 
});