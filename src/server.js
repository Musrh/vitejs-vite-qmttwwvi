const express = require("express")
const cors = require("cors")
const Stripe = require("stripe")

const stripe = new Stripe("sk_test_TA_CLE_ICI")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map(item => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.nom },
          unit_amount: item.prix * 100
        },
        quantity: item.quantity
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/panier"
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log("Server running on port 3000"))