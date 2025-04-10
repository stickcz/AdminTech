const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ 
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                // Añadir log para depuración
                console.log('Intentando autenticar usuario:', email);
                
                const user = await User.findOne({ email: email });
                if (!user) {
                    console.log('Usuario no encontrado');
                    return done(null, false, { message: 'Email no registrado' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    console.log('Autenticación exitosa para:', email);
                    return done(null, user);
                } else {
                    console.log('Contraseña incorrecta');
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            } catch (err) {
                console.error('Error en autenticación:', err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        console.log('Serializando usuario:', user.id);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log('Deserializando usuario ID:', id);
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            console.error('Error en deserialización:', err);
            done(err);
        }
    });
};