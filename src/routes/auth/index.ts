import { Router } from "express";
import { createUserSchema, loginSchema, userTable } from "../../db/usersSchema";
import { validateData } from "../../middleware/validationMiddleware";
import bcrypt from 'bcryptjs';
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);

        const [user] = await db.insert(userTable).values(data).returning();
        
        user.password = '';

    res.status(201).json({user});
    } catch (e) {
        res.status(500).send("Something happened")
    }
    
})

router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;

        const [user] = await db.select().from(userTable).where(eq(userTable.email, email));

        
        if (!user) {
            res.status(401).json({ error: 'Authentication Failed' });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            res.status(401).json({ error: 'Authentication Failed' });
        }

        //create a jwt token
        const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret', 
            {expiresIn: '30d'}
        )

        res.status(200).json({ token, user });

    } catch (e) {
        res.status(500).send("Something wen wrong");
    }
})

export default router;
 
