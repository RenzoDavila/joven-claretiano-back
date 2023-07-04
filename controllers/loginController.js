const Login = require("../models/Login");
const User = require("../models/User");
const bcryptjs = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { userLogin, passLogin } = req.body;
        const reqOjb = {};
        if (userLogin.indexOf("@") != -1) {
            reqOjb.email = userLogin;
        }
        else {
            reqOjb.codigo = userLogin;
        }
        console.log("reqOjb", reqOjb)
        const login = await User.findOne(reqOjb);
        if (login) {
            const compare = bcryptjs.compareSync(passLogin, login.password);
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