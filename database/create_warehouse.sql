-- Tabla de inventario por bodega / warehouse
-- Modelo actual: los productos se relacionan con proveedores mediante supplier_products
CREATE TABLE IF NOT EXISTS warehouse (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL UNIQUE,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_warehouse_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_warehouse_product_id
    ON warehouse(product_id);

-- Datos de prueba alineados con los productos ya insertados en schema.sql
INSERT INTO warehouse (id, product_id, stock, created_at, updated_at)
VALUES
    ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 10, NOW(), NOW()),
    ('20000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 100, NOW(), NOW()),
    ('30000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', 50, NOW(), NOW())
ON CONFLICT (product_id) DO NOTHING;
