module.exports = {
    recupera(req, res) {
        try {
            return res.json({
                message: "",
                data: [],
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
            return res.json({
                message: "",
                data: [],
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