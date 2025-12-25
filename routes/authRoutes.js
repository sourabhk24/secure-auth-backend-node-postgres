/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 */


const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const auth = require("../middleware/authMiddleware");
const allow = require("../middleware/roleMiddleware");
router.post("/register", register);
router.post("/login", login);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
});


router.get(
  "/admin-only",
  auth,
  allow(["admin"]),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "No token" });

  const result = await pool.query(
    "SELECT * FROM users WHERE refresh_token=$1",
    [refreshToken]
  );

  if (result.rowCount === 0)
    return res.status(403).json({ message: "Invalid token" });

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, user) => {
      if (err) return res.status(403).json({ message: "Token expired" });

      const newAccess = createAccessToken(result.rows[0]);

      res.json({ accessToken: newAccess });
    }
  );
});
router.post("/logout", async (req, res) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  await pool.query(
    "UPDATE users SET refresh_token=$1 WHERE id=$2",
    [refreshToken, user.id]
  );
  res.json({ accessToken, refreshToken });
});

module.exports = router;
