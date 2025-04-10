// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const passport = require('passport');
const logger = require('../../utils/logger');

// Asegúrate de que tu controlador de autenticación esté correctamente configurado
exports.getLogin = (req, res) => {
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login', { 
        title: 'Iniciar Sesión',
        message: req.flash('error') 
    });
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true,
        usernameField: 'email'
    })(req, res, next);
};

exports.getRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Registro',
        bodyClass: 'register-page'
    });
};

exports.postRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        await User.create(username, email, password);
        req.flash('success', 'Usuario registrado correctamente');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'Error al registrar usuario');
        res.redirect('/register');
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
            }
            res.clearCookie('connect.sid');
            // Forzar al navegador a no cachear
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.redirect('/login');
        });
    });
};
