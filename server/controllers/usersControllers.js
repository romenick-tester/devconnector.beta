const registerUser = (req,res) => {
    console.log(req.body);
    res.send("users route");
}

module.exports = { registerUser };
