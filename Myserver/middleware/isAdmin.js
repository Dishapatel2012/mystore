const express = require("express");
const isAdmin = async (req, res, next) => {
 
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Access denied. Admin only." });
    }       

}

module.exports = isAdmin;
