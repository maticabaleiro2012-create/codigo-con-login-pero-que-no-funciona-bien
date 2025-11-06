const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de sesiones
app.use(session({
  secret: 'mi-secreto-super-seguro-123',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 3600000, // 1 hora
    secure: false 
  }
}));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Base de datos simulada de usuarios (en producción usar una BD real)
const usuarios = {
  'admin': { password: 'admin123', nombre: 'Administrador' },
  'usuario': { password: 'usuario123', nombre: 'Usuario Demo' }
};

// Middleware para verificar autenticación
function requiereAuth(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  } else {
    return res.redirect('/login?error=auth');
  }
}

// Ruta principal - redirige al login si no está autenticado
app.get('/', (req, res) => {
  if (req.session && req.session.usuario) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Ruta de login - mostrar formulario
app.get('/login', (req, res) => {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  const error = req.query.error;
  res.render('login', { error });
});

// Procesar login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validar credenciales
  if (usuarios[username] && usuarios[username].password === password) {
    // Login exitoso
    req.session.usuario = {
      username: username,
      nombre: usuarios[username].nombre
    };
    res.redirect('/dashboard');
  } else {
    // Login fallido
    res.redirect('/login?error=invalid');
  }
});

// Dashboard - página protegida
app.get('/dashboard', requiereAuth, (req, res) => {
  res.render('dashboard', { 
    usuario: req.session.usuario 
  });
});

// Funcionalidad: Calculadora
app.get('/calculadora', requiereAuth, (req, res) => {
  res.render('calculadora', { 
    usuario: req.session.usuario 
  });
});

// API para la calculadora
app.post('/api/calcular', requiereAuth, (req, res) => {
  const { num1, num2, operacion } = req.body;
  let resultado;
  
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  
  if (isNaN(n1) || isNaN(n2)) {
    return res.json({ error: 'Números inválidos' });
  }
  
  switch (operacion) {
    case 'suma':
      resultado = n1 + n2;
      break;
    case 'resta':
      resultado = n1 - n2;
      break;
    case 'multiplicacion':
      resultado = n1 * n2;
      break;
    case 'division':
      if (n2 === 0) {
        return res.json({ error: 'No se puede dividir por cero' });
      }
      resultado = n1 / n2;
      break;
    default:
      return res.json({ error: 'Operación inválida' });
  }
  
  res.json({ resultado });
});

// Funcionalidad: Lista de tareas
app.get('/tareas', requiereAuth, (req, res) => {
  if (!req.session.tareas) {
    req.session.tareas = [];
  }
  res.render('tareas', { 
    usuario: req.session.usuario,
    tareas: req.session.tareas
  });
});

// API para agregar tarea
app.post('/api/tareas', requiereAuth, (req, res) => {
  if (!req.session.tareas) {
    req.session.tareas = [];
  }
  const { tarea } = req.body;
  if (tarea && tarea.trim()) {
    req.session.tareas.push({
      id: Date.now(),
      texto: tarea.trim(),
      completada: false
    });
  }
  res.redirect('/tareas');
});

// API para eliminar tarea
app.post('/api/tareas/eliminar', requiereAuth, (req, res) => {
  const { id } = req.body;
  if (req.session.tareas) {
    req.session.tareas = req.session.tareas.filter(t => t.id !== parseInt(id));
  }
  res.redirect('/tareas');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/login');
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('error', { 
    mensaje: 'Página no encontrada',
    usuario: req.session ? req.session.usuario : null
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Usuarios de prueba:');
  console.log('  - Username: admin, Password: admin123');
  console.log('  - Username: usuario, Password: usuario123');
});
