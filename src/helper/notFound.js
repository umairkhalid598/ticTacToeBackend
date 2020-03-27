module.exports = (req, res) => res.status(404).json({ status: 404, errors: [{ msg: "Route not found" }] });
