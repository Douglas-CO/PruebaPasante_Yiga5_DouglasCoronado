const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./BD/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());

//BODEGA-CREAR
app.post("/Bodega", async (req, res) => {
  const { nombre, encargado, ubicacion } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Bodega (nombre, encargado, ubicacion) VALUES ($1, $2, $3) RETURNING *",
      [nombre, encargado, ubicacion]
    );

    if (result.rows.length > 0) {
      const nuevoDato = result.rows[0];
      res.status(201).json({ mensaje: "Bodega creada correctamente", nuevoDato });
      console.log("Se ha realizado un POST en /Bodega");
    } else {
      res.status(500).json({ error: "No se pudo crear el Bodega" });
    }
  } catch (error) {
    console.error("Error al crear Bodega:", error);
    res.status(500).json({ error: "Error al crear Bodega" });
  }
});

//BODEGA-LEER
app.get("/Bodega", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Bodega");
    res.json(result.rows);
    console.log("Se ha realizado un GET en /Bodega");
  } catch (error) {
    console.error("Error al obtener Bodega:", error);
    res.status(500).json({ error: "Error al obtener Bodega" });
  }
});

//BODEGA-ACTUALIZAR
app.put("/Bodega/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, encargado, ubicacion } = req.body;

  try {
    const result = await pool.query(
      "UPDATE Bodega SET nombre = $1, encargado = $2, ubicacion = $3 WHERE id = $4 RETURNING *",
      [nombre, encargado, ubicacion, id]
    );

    if (result.rows.length > 0) {
      const datoActualizado = result.rows[0];
      res.json({
        mensaje: `Bodega con ID ${id} actualizada correctamente`,
        datoActualizado,
      });
      console.log(`Se ha realizado un PUT en /Bodega/${id}`);
    } else {
      res
        .status(404)
        .json({ error: `No se encontró ningúna Bodega con ID ${id}` });
    }
  } catch (error) {
    console.error("Error al actualizar Bodega:", error);
    res.status(500).json({ error: "Error al actualizar Bodega" });
  }
});

//BODEGA-ELIMINAR
app.delete("/Bodega/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Bodega WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.json({ mensaje: `Bodega con ID ${id} eliminada correctamente` });
      console.log(`Se ha realizado un DELETE en /Bodega/${id}`);
    } else {
      res
        .status(404)
        .json({ error: `No se encontró ningúna Bodega con ID ${id}` });
    }
  } catch (error) {
    console.error("Error al eliminar Bodega:", error);
    res.status(500).json({ error: "Error al eliminar Bodega" });
  }
});

//PRODUCTO-CREAR
app.post("/Producto", async (req, res) => {
    const { nombre, descripcion} = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO Producto (nombre, descripcion) VALUES ($1, $2) RETURNING *",
        [nombre, descripcion]
      );
  
      if (result.rows.length > 0) {
        const nuevoDato = result.rows[0];
        res.status(201).json({ mensaje: "Producto creada correctamente", nuevoDato });
        console.log("Se ha realizado un POST en /Producto");
      } else {
        res.status(500).json({ error: "No se pudo crear el Producto" });
      }
    } catch (error) {
      console.error("Error al crear Producto:", error);
      res.status(500).json({ error: "Error al crear Producto" });
    }
  });

//PRODUCTO-LEER
app.get("/Producto", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM Producto");
      res.json(result.rows);
      console.log("Se ha realizado un GET en /Producto");
    } catch (error) {
      console.error("Error al obtener Producto:", error);
      res.status(500).json({ error: "Error al obtener Producto" });
    }
  });

//PRODUCTO-ACTUALIZAR
app.put("/Producto/:id", async (req, res) => {
    const { id } = req.params;
    const {nombre, descripcion} = req.body;
  
    try {
      const result = await pool.query(
        "UPDATE Producto SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
        [nombre, descripcion, id]
      );
  
      if (result.rows.length > 0) {
        const datoActualizado = result.rows[0];
        res.json({
          mensaje: `Producto con ID ${id} actualizada correctamente`,
          datoActualizado,
        });
        console.log(`Se ha realizado un PUT en /Producto/${id}`);
      } else {
        res
          .status(404)
          .json({ error: `No se encontró ningúna Producto con ID ${id}` });
      }
    } catch (error) {
      console.error("Error al actualizar Producto:", error);
      res.status(500).json({ error: "Error al actualizar Producto" });
    }
  });

//PRODUCTO-ELIMINAR
app.delete("/Producto/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        "DELETE FROM Producto WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (result.rows.length > 0) {
        res.json({ mensaje: `Producto con ID ${id} eliminada correctamente` });
        console.log(`Se ha realizado un DELETE en /Producto/${id}`);
      } else {
        res
          .status(404)
          .json({ error: `No se encontró ningúna Producto con ID ${id}` });
      }
    } catch (error) {
      console.error("Error al eliminar Producto:", error);
      res.status(500).json({ error: "Error al eliminar Producto" });
    }
  });

//STOCK-ELIMINAR
app.delete("/Stock/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        "DELETE FROM Stock WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (result.rows.length > 0) {
        res.json({ mensaje: `Stock con ID ${id} eliminada correctamente` });
        console.log(`Se ha realizado un DELETE en /Stock/${id}`);
      } else {
        res
          .status(404)
          .json({ error: `No se encontró ningúna Stock con ID ${id}` });
      }
    } catch (error) {
      console.error("Error al eliminar Stock:", error);
      res.status(500).json({ error: "Error al eliminar Stock" });
    }
  });


//STOCK-CREAR
app.post("/IngresoStock", async (req, res) => {
    const { bodega_id, producto_id, cantidad } = req.body;

    try {
        const existingStock = await pool.query(
            "SELECT * FROM Stock WHERE bodega_id = $1 AND producto_id = $2",
            [bodega_id, producto_id]
        );

        if (existingStock.rows.length > 0) {
            const updatedStock = await pool.query(
                "UPDATE Stock SET cantidad = cantidad + $1 WHERE bodega_id = $2 AND producto_id = $3 RETURNING *",
                [cantidad, bodega_id, producto_id]
            );

            res.json({ mensaje: "Stock actualizado correctamente", stock: updatedStock.rows[0] });
        } else {
            const newStock = await pool.query(
                "INSERT INTO Stock (bodega_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *",
                [bodega_id, producto_id, cantidad]
            );

            res.status(201).json({ mensaje: "Stock creado correctamente", stock: newStock.rows[0] });
        }
    } catch (error) {
        console.error("Error al procesar el ingreso de stock:", error);
        res.status(500).json({ error: "Error al procesar el ingreso de stock" });
    }
});

//STOCK-ELIMINAR
app.post("/EgresoStock", async (req, res) => {
    const { bodega_id, producto_id, cantidad } = req.body;

    try {
        const existingStock = await pool.query(
            "SELECT * FROM Stock WHERE bodega_id = $1 AND producto_id = $2",
            [bodega_id, producto_id]
        );

        if (existingStock.rows.length > 0 && existingStock.rows[0].cantidad >= cantidad) {
            const updatedStock = await pool.query(
                "UPDATE Stock SET cantidad = cantidad - $1 WHERE bodega_id = $2 AND producto_id = $3 RETURNING *",
                [cantidad, bodega_id, producto_id]
            );

            res.json({ mensaje: "Stock actualizado correctamente", stock: updatedStock.rows[0] });
        } else {
            res.status(400).json({ error: "No hay suficiente stock para el egreso" });
        }
    } catch (error) {
        console.error("Error al procesar el egreso de stock:", error);
        res.status(500).json({ error: "Error al procesar el egreso de stock" });
    }
});

//STOCK-LEER
app.get("/Stock", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM Stock");
      res.json(result.rows);
      console.log("Se ha realizado un GET en /Stock");
    } catch (error) {
      console.error("Error al obtener Stock:", error);
      res.status(500).json({ error: "Error al obtener Stock" });
    }
  });


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
