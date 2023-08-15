# Nest Bakery Server

## Importante

Crear los roles con los que el sistema va a trabajar:

User roles:

| Rol      | id  |
| -------- | :-: |
| admin    |  1  |
| user     |  2  |
| delivery |  3  |

```sql
-- create roles
insert into tb_rol (id, name) values (1, 'admin'), (2, 'user'), (3, 'delivery');
```

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

# Credentials

**test environment**

```
user
    b@gmail.com
    123456

admin
    bryan@gmail.com
    bryan123
```

**prod environment**

```
user


admin
    admin@test.com
    admin123
```

## Instalación y ejecución

Ejecución de la base de datos en docker

```bash
sudo docker-compose up -d
```

Se puede verificar el correcto funcionamiento en la extensión de docker de vs code

```bash
npm install
npm run start:dev
```

## Despliegue en Heroku

1. Cambiar las variables de entorno
2. Activar la configuración de ssl en database.provider.ts
3. Ejecutar los comandos

```bash
git add .
git commit -m "commit message"
git push heroku main
npm run start:dev
```

## TODO

- Review desable eslint comments
- Verify deprecated packages

## Autor

- Email - [bryan.aguilar6174@gmail.com](mailto:bryan.aguilar6174@gmail.com)
- Website - [bryanaguilar](https://bryan-aguilar.com/)
- Medium - [bryanaguilar6174](https://bryanaguilar6174.medium.com/)
- LinkeIn - [bryanaguilar6174](https://www.linkedin.com/in/bryanaguilar6174)
