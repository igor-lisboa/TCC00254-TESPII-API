const { client, getByKey } = require("../db/redis");
module.exports = {
    async recupera(req, res) {
        try {
            return res.json({
                message: "Informações recuperadas com sucesso!",
                data: JSON.parse(await getByKey("informacoes")),
                success: true
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: e,
                data: null,
                success: false
            });
        }
    }, atualiza(req, res) {
        try {
            // inclui campo atualizado em
            req.body.atualizadoEm = new Date().getTime();
            client.set("informacoes", JSON.stringify(req.body));
            return res.json({
                message: "Informações atualizadas com sucesso!",
                data: req.body,
                success: true
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: e,
                data: null,
                success: false
            });
        }
    }
}