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
            ].sort(),
            documentacao: "https://documenter.getpostman.com/view/15046943/TzJrByfx"
        },
        success: true
    });
});

routes.get("/info", InformacaoController.recupera);
routes.post("/info", InformacaoController.atualiza);

module.exports = routes;