const express = require("express");

const InformacaoController = require("./controllers/InformacaoController");

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({
        message: "Olá, essa API guarda dados em JSON e deixa a ALEXA recuperar!",
        data: {
            grupo: [
                "Igor Lisbôa",
                "Caio Wey"
            ].sort()
        },
        success: true
    });
});

routes.get("/info", InformacaoController.recupera);
routes.post("/info", InformacaoController.atualiza);
routes.get('/saudacao', InformacaoController.saudacao)

module.exports = routes;