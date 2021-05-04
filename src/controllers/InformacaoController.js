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
            const agora = new Date().getTime();
            const oneHourInMiliseconds = 3600000;
            const brazilDiffToUtc = 3;

            const duration = agora - (oneHourInMiliseconds * brazilDiffToUtc);

            const seconds = Math.floor((duration / 1000) % 60);
            const minutes = Math.floor((duration / (1000 * 60)) % 60);
            const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

            const hoursString = hours < 10 ? "0" + hours : hours.toString();
            const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
            const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
            const formated = `${hoursString}:${minutesString}:${secondsString}`;

            // inclui campo atualizado em
            req.body.atualizadoEm = formated;
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