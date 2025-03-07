-- Create the database
--CREATE DATABASE ecommerce;

-- Users table with 
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'ADMIN')),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Products table 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT, 
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    image TEXT,
    qty INT,
    disabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Carts table 
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    qty INT NOT NULL DEFAULT 1,
    checked BOOLEAN DEFAULT FALSE
);

ALTER TABLE carts ADD COLUMN checked BOOLEAN DEFAULT FALSE;
-- Orders table 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    costumer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Status column with a CHECK constraint for allowed values
    status VARCHAR(50) NOT NULL,
    CONSTRAINT status_check CHECK (
        status IN (
            'PENDING', 
            'CONFIRMED', 
            'PROCESSING', 
            'ON TRANSIT', 
            'DELIVERED', 
            'CANCELLED', 
            'RETURNED', 
            'REJECTED', 
            'REFUNDED'
        )
    ),
    
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Order Items table 
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    qty INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00 
);

-- Order History table
CREATE TABLE order_history (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert dummy data into the users table
INSERT INTO users (username, password, email) VALUES
('john_doe', 'password123', 'john_doe@gmail.com'),
('jane_smith', 'password456', 'jane_smith@gmail.com'),
('alice_wonder', 'password789', 'alice_wonder');

--insert dummy data into the categories table
INSERT INTO categories (name) VALUES 
    ('Electronics'),
    ('Accessories'),
    ('Footwear'),
    ('Clothing');
    
-- Insert dummy data into the products table 
INSERT INTO products (product_name, description, price, category_id, image, total) VALUES
('Apple iPhone 14', 'Latest Apple smartphone', 999.99, 1, 'iphone14.png', 50),
('Samsung Galaxy S22', 'Latest Samsung smartphone', 899.99, 1, 'galaxy_s22.png', 30),
('Sony Headphones', 'Noise-cancelling headphones', 199.99, 2, 'sony_headphones.png', 100),
('Nike Running Shoes', 'Comfortable running shoes', 120.00, 3, 'nike_shoes.png', 0),
('Adidas T-shirt', 'Breathable sports t-shirt', 25.00, 4, 'adidas_tshirt.png', 200);


-- Insert dummy data into the carts table
INSERT INTO carts (user_id, product_id, total) VALUES
((SELECT id FROM users WHERE username = 'john_doe'), 1, 999.99),
((SELECT id FROM users WHERE username = 'jane_smith'), 2, 899.99),
((SELECT id FROM users WHERE username = 'alice_wonder'), 3, 199.99);

-- Insert dummy data into the orders table
INSERT INTO orders (costumer_id, status) VALUES
((SELECT id FROM users WHERE username = 'john_doe'), 'Pending'),
((SELECT id FROM users WHERE username = 'jane_smith'), 'Shipped'),
((SELECT id FROM users WHERE username = 'alice_wonder'), 'Delivered');

-- Insert dummy data into the order_items table
INSERT INTO order_items (order_id, product_id, total) VALUES
(1, 1, 999.99),
(2, 2, 899.99),
(3, 3, 199.99),
(1, 4, 120.00),
(2, 5, 25.00);

-- Insert dummy data into the order_history table
INSERT INTO order_history (order_id, status) VALUES
(1, 'Pending'),
(1, 'Processing'),
(2, 'Shipped'),
(3, 'Delivered');
