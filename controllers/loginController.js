const Login = require("../models/Login");
const bcryptjs = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { user, pass } = req.body;
        const reqOjb = {};
        if (user.indexOf("@") != -1) {
            reqOjb.email = user;
        }
        else {
            reqOjb.codigo = user;
        }
        const login = await Login.findOne(reqOjb);
        if (login) {
            const compare = bcryptjs.compareSync(pass, login.password);
            if (compare) {
                return res.json(login);
            }
            else {
                return res.json({ message: 'La contraseña no es correcta' });
            }
        }
        else {
            return res.json({ message: 'El usuario no existe' });
        }
    }
    catch (error) {
        console.log(" ****************** Error en loginUser ==>", error);
        return res.status(500).send("Contraseña o usuario equivocado");
    }
};