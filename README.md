# Aplicación con Sistema de Login

Aplicación web funcional desarrollada con Node.js y Express que incluye un sistema de autenticación completo y múltiples funcionalidades.

## 🚀 Características

### 🔐 Sistema de Autenticación
- Login seguro con gestión de sesiones
- Middleware de protección de rutas
- Usuarios de prueba preconfigurados
- Redirección automática para usuarios no autenticados

### 🧮 Calculadora
- Operaciones matemáticas básicas (suma, resta, multiplicación, división)
- Interfaz interactiva con validación de errores
- Manejo de casos especiales (división por cero)

### 📝 Lista de Tareas
- Crear y eliminar tareas
- Persistencia en sesión del usuario
- Interfaz intuitiva y fácil de usar

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/maticabaleiro2012-create/codigo-con-login-pero-que-no-funciona-bien.git

# Navegar al directorio
cd codigo-con-login-pero-que-no-funciona-bien

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 👥 Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Administrador |
| usuario | usuario123 | Usuario Demo |

## 🏗️ Estructura del Proyecto

```
.
├── server.js           # Servidor Express y lógica principal
├── package.json        # Dependencias y scripts
├── views/              # Plantillas EJS
│   ├── login.ejs       # Página de inicio de sesión
│   ├── dashboard.ejs   # Dashboard principal
│   ├── calculadora.ejs # Calculadora
│   ├── tareas.ejs      # Lista de tareas
│   └── error.ejs       # Página de error 404
└── .gitignore          # Archivos ignorados por Git
```

## 🔒 Notas de Seguridad

**⚠️ IMPORTANTE:** Esta es una aplicación de demostración. Para uso en producción, se deben implementar las siguientes mejoras de seguridad:

1. **Contraseñas**: Las contraseñas deben ser hasheadas con bcrypt antes de almacenarlas
2. **Base de datos**: Usar una base de datos real (PostgreSQL, MongoDB, etc.) en lugar de almacenamiento en memoria
3. **Variables de entorno**: Configurar `SESSION_SECRET` y otras variables sensibles en archivos `.env`
4. **HTTPS**: Habilitar `cookie.secure = true` y usar HTTPS en producción
5. **Validación**: Implementar validación más robusta de entrada de usuario
6. **Rate limiting**: Agregar limitación de intentos de login para prevenir ataques de fuerza bruta
7. **CSRF Protection**: Implementar tokens CSRF usando el middleware `csurf` para proteger formularios contra ataques Cross-Site Request Forgery
8. **Input sanitization**: Sanitizar y validar todas las entradas del usuario para prevenir inyección de código

## 📦 Dependencias

- **express**: Framework web para Node.js
- **express-session**: Middleware para gestión de sesiones
- **body-parser**: Middleware para parsear cuerpos de peticiones
- **ejs**: Motor de plantillas para generar HTML dinámico

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo LICENSE para más detalles.
