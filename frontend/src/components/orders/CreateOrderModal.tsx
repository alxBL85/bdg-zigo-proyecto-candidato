import { useForm } from "@tanstack/react-form";

import {
  createOrderSchema,
  type CreateOrderFormData,
} from "../../schemas/order.schema";

import { useCreateOrder } from "../../hooks/useCreateOrder";

interface Props {
  customerId: string;
  onClose: () => void;
}

export default function CreateOrderModal({ customerId, onClose }: Props) {
  const createOrderMutation = useCreateOrder(customerId);

  const form = useForm({
    defaultValues: {
      customerId,
      notes: "",
      items: [
        {
          productId: "",
          quantity: 1,
        },
      ],
    } as CreateOrderFormData,
    onSubmit: async ({ value }) => {
      try {
        await createOrderMutation.mutateAsync(value);
        alert("Orden creada satisfactoriamente");
        onClose();
      } catch (error) {
        alert("Error creando la orden: " + (error as Error).message);
      }
    },
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          width: "600px",
          borderRadius: "8px",
        }}
      >
        <h2>Crear Orden</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <h3>Items</h3>
          <form.Field name="items" mode="array">
            {(field) => (
              <div>
                {field.state.value.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <form.Field name={`items[${index}].productId`}>
                      {(subField) => (
                        <div>
                          <input
                            type="text"
                            placeholder="Product ID"
                            value={subField.state.value ?? ""}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                        </div>
                      )}
                    </form.Field>
                    <form.Field name={`items[${index}].quantity`}>
                      {(subField) => (
                        <div>
                          <input
                            type="number"
                            min={1}
                            value={subField.state.value ?? 1}
                            onChange={(e) =>
                              subField.handleChange(Number(e.target.value))
                            }
                          />
                        </div>
                      )}
                    </form.Field>
                    <button
                      type="button"
                      onClick={() => field.removeValue(index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    field.pushValue({ productId: "", quantity: 1 })
                  }
                >
                  Agregar Item
                </button>
              </div>
            )}
          </form.Field>
          <form.Field name="notes">
            {(field) => (
              <div style={{ marginBottom: "1rem" }}>
                <label>Notas</label>
                <textarea
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </form.Field>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={createOrderMutation.isPending}>
              {createOrderMutation.isPending
                ? "Creando Orden.."
                : "Crear Orden"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
