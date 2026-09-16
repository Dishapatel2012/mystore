const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const upload = require("./middleware/imageUpload");
const Product = require("./model/productSchema");
const Category = require("./model/categorySchema");
const User = require("./model/userSchema");
const Order = require("./model/orderSchema");
const Cart = require("./model/cartSchema");
const jwt = require("jsonwebtoken");
const port = 3000;
const bcrypt = require("bcrypt");
const validToken = require("./middleware/validToken");
const isAdmin = require("./middleware/isAdmin");
const Address = require("./model/Address");
const razorpayInstance = require("./middleware/razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

mongoose
    .connect("mongodb://localhost:27017/Mystore")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Product Added Successfully!!");
});

app.post(
    "/add-product",
    validToken,
    isAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                productName,
                productDescription,
                productPrice,
                categoryId,
            } = req.body;

            const image = req.file.filename;

            const product = new Product({
                productName,
                productDescription,
                productPrice,
                categoryId,
                image,
            });

            await product.save();

            res.status(200).json({
                message: "Product added successfully",
            });
        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Error adding product",
            });
        }
    }
);

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find().populate("categoryId");

        res.status(200).json(products);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error fetching products",
        });
    }
});

app.post(
    "/add-category",
    validToken,
    isAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { categoryName } = req.body;

            const image = req.file.filename;

            const category = new Category({
                categoryName,
                image,
            });

            await category.save();

            res.status(200).json({
                message: "Category added successfully",
            });
        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Error adding category",
            });
        }
    }
);

app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error fetching categories",
        });
    }
});

app.post("/signup", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword,
            role,
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.json({
            message: "User registered successfully",
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            "secret_key",
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.post("/add-cart", validToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity,
                    },
                ],
                total: product.productPrice * quantity,
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) =>
                    item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    quantity,
                });
            }

            let total = 0;

            for (const item of cart.items) {
                const p = await Product.findById(
                    item.productId
                );

                total +=
                    Number(p.productPrice) *
                    item.quantity;
            }

            cart.total = total;
        }

        await cart.save();

        res.json({
            success: true,
            message: "Added Successfully",
            cart,
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.get("/cart", validToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.user.id,
        }).populate("items.productId");

        if (!cart) {
            return res.json({
                items: [],
                total: 0,
            });
        }

        res.json(cart);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

app.delete("/cart/:id", validToken, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== itemId
        );

        await cart.save();

        res.json({
            message: "Item removed successfully",
        });
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
});

app.put(
    "/cart/increase/:productId",
    validToken,
    async (req, res) => {
        try {
            const cart = await Cart.findOne({
                userId: req.user.id,
            });

            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }

            const item = cart.items.find(
                (i) =>
                    i.productId.toString() ===
                    req.params.productId
            );

            if (!item) {
                return res.status(404).json({
                    message: "Item not found",
                });
            }

            item.quantity += 1;

            let total = 0;

            for (const i of cart.items) {
                const product = await Product.findById(
                    i.productId
                );

                total +=
                    Number(product.productPrice) *
                    i.quantity;
            }

            cart.total = total;

            await cart.save();

            res.json({
                message: "Quantity Increased",
                cart,
            });
        } catch (err) {
            console.log(err);

            res.status(500).json(err);
        }
    }
);

app.put(
    "/cart/decrease/:productId",
    validToken,
    async (req, res) => {
        try {
            const cart = await Cart.findOne({
                userId: req.user.id,
            });

            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }

            const item = cart.items.find(
                (i) =>
                    i.productId.toString() ===
                    req.params.productId
            );

            if (!item) {
                return res.status(404).json({
                    message: "Item not found",
                });
            }

            if (item.quantity > 1) {
                item.quantity -= 1;
            }

            let total = 0;

            for (const i of cart.items) {
                const product = await Product.findById(
                    i.productId
                );

                total +=
                    Number(product.productPrice) *
                    i.quantity;
            }

            cart.total = total;

            await cart.save();

            res.json({
                message: "Quantity Decreased",
                cart,
            });
        } catch (err) {
            console.log(err);

            res.status(500).json(err);
        }
    }
);

app.post("/place-order", validToken, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            street,
            apartment,
            city,
            state,
            zip,
            country
        } = req.body.orderData;

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response
        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature)

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");


        if (expectedSignature !== razorpay_signature) {

            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
        const cart = await Cart.findOne({
            userId: req.user.id,
        }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        const order = new Order({
            userId: req.user.id,

            items: cart.items.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            })),

            total: cart.total,

            shippingAddress: {
                firstName,
                lastName,
                email,
                phone,
                street,
                apartment,
                city,
                state,
                zip,
                country,
            },

            orderStatus: "Pending",

            paymentStatus: "Pending",
        });

        await order.save();

        cart.items = [];
        cart.total = 0;

        await cart.save();

        res.json({
            success: true,
            message: "Order Placed Successfully",
            order,
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.get("/orders", validToken, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user.id,
        })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
});

app.get("/manage-orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId")
            .populate("items.productId")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
});

app.put("/manage-orders/:id", async (req, res) => {
    try {
        const { orderStatus } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
        ];

        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                orderStatus: orderStatus,
            },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("userId")
            .populate("items.productId");

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update order status",
        });
    }
});

app.delete("/manage-orders/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json({
            message: "Order Deleted",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete order",
        });
    }
});

app.get("/addresses", validToken, async (req, res) => {
    try {
        const addresses = await Address.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        res.json(addresses);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch addresses",
        });
    }
});

app.post("/addresses", validToken, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            street,
            apartment,
            city,
            state,
            zip,
            country,
        } = req.body;

        const address = new Address({
            userId: req.user.id,
            firstName,
            lastName,
            email,
            phone,
            street,
            apartment,
            city,
            state,
            zip,
            country,
        });

        await address.save();

        res.status(201).json({
            message: "Address saved successfully",
            address,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to save address",
        });
    }
});

app.post('/api/payment/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});