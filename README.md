
# BeerUP



Aplicacion realizada como parte del Challenge técnico de Santander Tecnologia. La misma es un gestor de reuniones 
entre los usuarios. El usuario creador de la meetup va a poder saber cuantas cervezas comprar en relacion a la cantidad de personas que asistan y a la temperatura que haga ese día. El usuario podra confirmar su asistencia y podra saber cuando fue invitado a una gracias al sismte de notificaciones de la app.
![Logo](https://i.imgur.com/9SIWIj3.png)


## Niveles de usuario.

La aplicación cuanta con dos niveles de usuario: "User" y "Admin".


### Admin
```bash
- Saber cuantas cajas de cerveza (6 UNIDADES) tengo que comprar para la meetup 
- Saber la temperatura del dia de la meetup
- Poder armar meetups para invitar a otras personas
- Tener acceso a todas sus meetups 
- Puede ver la cantidad de personas que confirmaron su asistencia.
- Puede eliminar Meetups.
```
### User
```bash
- Saber la temperatura del dia de la meetup
- Poder inscribirme en una meetup
- Recibir notifiaciones cuando es invitado a una meetup.
- Hacer check-in en una meetup finalizada para saber que estuve ahi.
- Tener acceso a todas las meetups.
- Visualizar las meetups activas y aquellas finalizadas.
```

## Tecnologias utilizadas.

### Frontend:
React, Chakra-ui.   

### Backend:
Node, Express, Mongoose, MongoDB, JWT, bcrypt. 



## Configuraciones para instalar en aplicación local.

### Backend: puerto 5000
```bash
- Dentro de la carpeta "backend" crear un archivo .env con los siguientes datos:
```
```bash
- MONGODB_URL = "dirección local de mongodb"
- PORT = "puerto del backend"
- SECRET_KEY = "secret key para bcrypt"
```
```bash
Dentro de la carpeta "backend": 
- npm install
- npm start
```

### Frontend: puerto 3000
```bash
- Dentro de la carpeta "frontend" crear un archivo .env con los siguientes datos:
```
```bash
- MONGODB_URL = "dirección local de mongodb"
- PORT = "puerto del backend"
- SECRET_KEY = "secret key para bcrypt"
```
```bash
Dentro de la carpeta "frontend": 
- npm install
- npm start
```

### Usuarios de ejemplo:
```bash
"Admin":

-Email: julieta@test.com
-Password: 12345-
    
-User: sebas@test.com
-Password: 12345

"User":

- User: maria@test.com
- Password: 12345

- User: huguito@data.com
- Password: 12345

- User: martin@test.com
- Password: 12345
```


## Deployment

El proyecto se encuentra publicado en:

```bash
http://LINKDELDEPLOY.COM
```


