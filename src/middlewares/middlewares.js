export const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    console.log("Debes logearte primero")
    res.redirect("/login")
}