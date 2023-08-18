# Nest Bakery Server

## Importante

TODO:

Create database db_bakery

Order states:

| State     | id  |
| --------- | :-: |
| pending   |  1  |
| delivered |  2  |

```sql
-- create roles
insert into tb_order_state (id, name) values (1, 'pending'), (2, 'delivered');
```

Payment methos:

| Method   | id  |
| -------- | :-: |
| cash     |  1  |
| transfer |  2  |
| card     |  3  |

```sql
-- create roles
insert into tb_payment_method (id, name) values (1, 'cash'), (2, 'transfer'), (3, 'card');
```

Debe registrar un administrador

## Instalación y ejecución

Ejecución de la base de datos en docker

```bash
docker compose up -d
```

Se puede verificar el correcto funcionamiento en la extensión de docker de vs code

```bash
yarn
yarn run start:dev
```

## TODO

- Review desable eslint comments
- Define interfaces to control domain

## Autor

- Email - [bryan.aguilar6174@gmail.com](mailto:bryan.aguilar6174@gmail.com)
- Website - [bryanaguilar](https://bryan-aguilar.com/)
- Medium - [bryanaguilar6174](https://bryanaguilar6174.medium.com/)
- LinkeIn - [bryanaguilar6174](https://www.linkedin.com/in/bryanaguilar6174)
