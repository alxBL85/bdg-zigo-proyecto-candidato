CREATE TABLE customers (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    total DECIMAL(10,2),
    notes VARCHAR(1000),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE processed_commands (
    idempotency_key VARCHAR(255) PRIMARY KEY,
    command_type VARCHAR(100) NOT NULL,
    result JSONB,
    processed_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO customers (id, email, name) VALUES
    ('c0000000-0000-0000-0000-000000000001', 'juan@empresa.com', 'Juan Pérez'),
    ('c0000000-0000-0000-0000-000000000002', 'maria@empresa.com', 'María García');

INSERT INTO products (id, sku, name, unit_price, stock) VALUES
    ('10000000-0000-0000-0000-000000000001', 'LAPTOP-001', 'Laptop Dell XPS 15', 2500.00, 10),
    ('20000000-0000-0000-0000-000000000002', 'MOUSE-001', 'Mouse Inalámbrico', 45.50, 100),
    ('30000000-0000-0000-0000-000000000003', 'KB-001', 'Teclado Mecánico', 120.00, 50);

INSERT INTO orders (id, customer_id, status, total) VALUES
    ('10000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'DRAFT', 2545.50);

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
    ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1, 2500.00),
    ('10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 1, 45.50);
