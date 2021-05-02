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
    }, async atualiza(req, res) {
        try {
            const infoAnterior = JSON.parse(await getByKey("informacoes"));
            const agora = new Date();
            const horas = agora.getUTCHours() - 3;
            // inclui campo atualizado em
            req.body.atualizadoEm = `${agora.getUTCFullYear()}-${agora.getUTCMonth().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}-${agora.getUTCDate().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })} ${horas.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}:${agora.getUTCMinutes().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}:${agora.getUTCSeconds().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}`;
            client.set("informacoes", JSON.stringify(req.body));
            return res.json({
                message: "Informações atualizadas com sucesso!",
                data: { infoAnterior, novaInfo: req.body },
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
    }, saudacao(req, res) {
        try {
            const hoje = new Date();
            const horas = hoje.getUTCHours() - 3;

            let saudacao = "";

            if (horas >= 6 && horas <= 12) {
                saudacao = "Bom dia!";
            } else if (horas > 12 && horas < 18) {
                saudacao = "Boa tarde!";
            } else {
                saudacao = "Boa noite!";
            }
            return res.json({
                message: "Saudação recuperada com sucesso!",
                data: {
                    saudacao,
                    horas
                },
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