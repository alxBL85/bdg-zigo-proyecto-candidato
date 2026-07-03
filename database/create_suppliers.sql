
CREATE TABLE suppliers (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(150),
    address TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE supplier_products (
    id UUID PRIMARY KEY,
    supplier_id UUID NOT NULL,
    product_id UUID NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL,
    effective_from TIMESTAMP NOT NULL DEFAULT NOW(),
    effective_to TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_supplier_products_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_supplier_products_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_supplier_products_supplier
    ON supplier_products(supplier_id);

CREATE INDEX idx_supplier_products_product
    ON supplier_products(product_id);

CREATE INDEX idx_supplier_products_effective_from
    ON supplier_products(effective_from);

-- VALIDACIÓN
-- effective_to debe ser mayor que effective_from

ALTER TABLE supplier_products
ADD CONSTRAINT chk_supplier_products_dates
CHECK (
    effective_to IS NULL
    OR effective_to > effective_from
);


-- Data de Pruebas:
INSERT INTO suppliers(id, name, phone, email, address)
VALUES ('10000000-0000-0000-0000-000000000001', 'Proveedor 1', '1234-5678', 'proveedor1@suppliers.com', '1 calle 1-1 zona 1');

INSERT INTO supplier_products(id, supplier_id, product_id, purchase_price)
VALUES('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1)
