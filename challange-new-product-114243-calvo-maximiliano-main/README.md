[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7_aSPoPV)

# Pre Parcial

Para este ejercicio se debe contar con la API provista para la materia: `https://github.com/mauriciobergallo/utn-dabd-restapi`; la url que se debe utilizar es: `http://localhost:3000/api/products/`

Se considera un Producto cuando el mismo tiene productType='Producto' y por ende requiere Stock (es decir carga de inventario, lugar y cantidad). Se considera que un producto es Servicio cuando productType='Servicio' y por ende no requiere inventario o stock pero si se debe especificar la fracción de tiempo a contabilizar como unidad.

## Se pide

A partir del formulario HTML hecho en Bootstrap se debe...

- Migrar el form a ReactiveForm
- Crear las validaciones:
  - Product Name: mínimo de caracteres 5, campo requerido.
  - Product Description: mínimo de caracteres 10, campo requerido.
  - Product Price: valor mínimo 1, campo requerido.
  - Product Location: mínimo de caracteres 5, campo requerido.
  - Product Stock: valor mínimo 1, valor máximo 100, campo requerido.
  - Product TimeFraction: valor mínimo 10, máximo 60.
  - Cuando no haya Stock, mostrar un mensaje: 'No hay inventario cargado'
- Utilizando ValueChange, debemos:
  - Si es producto, agregar Stock y sus validaciones.
  - Si es servicio, no agregar Stock y definir el TimePeriod y sus validaciones.
  - En ambos casos se debe limpiar los datos de la porción del formulario.
- Estilos en el form:
  - Borde en rojo para los inputs (cuando son visitados y no son validos).
  - Mensaje con el error ocurrido.

## Documentación de API

### Agregar producto o servicio

```
POST
http://localhost:3000/api/products
Content-Type: application/json

{
    "name": "Yerba Playadito",
    "description": "Yerba para tomar mates por la mañana",
    "price": 1500,
    "productType": "Producto",
    "inventories": [
        {
            "location": "Sucursal Río Ceballos",
            "count": 1500
        }
    ]

}
```

```
### Add Service
POST http://localhost:3000/api/products
Content-Type: application/json

{
    "name": "Hora Programación",
    "description": "Servicio de programación por hora",
    "price": 2500,
    "productType": "Servicio",
    "timeFraction": 60
}
```

### Obtener producto o servicio por nombre

```
### Get Product by Name
GET http://localhost:3000/api/products/yerba%20playadito
```

```
### Get Service by Name
GET http://localhost:3000/api/products/hora%20programaci%C3%B3n
```
