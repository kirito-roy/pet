import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { SignJWT } from 'jose';
import { jwtVerify } from 'jose';
import { StudentF } from "./functions/studentF.js";

const app = new Hono();
const studentF = new StudentF();
app.use('/api/*', cors());

// test apis
app.get('/api/hello', async c => {
	try {
		const { id } = await c.req.json();
		// Perform the database query
		const response = await studentF.getStudent(c,id);
		if (response.status !== 'error') {
		// Return the results as JSON
		return c.json({ data: response.data, headers: response.headers, status: response.status }, 200);
		} else {
        // Return the error as JSON
        return c.json({ data: "data not found" }, 404);
        }

	} catch (error) {
		// Log the error for debugging purposes
		const response = await studentF.getStudent(c);
		if (response.status !== 'error') {
		// Return the results as JSON
		return c.json({ data: response.data, headers: response.headers, status: response.status }, 200);
        } else {
        // Return the error as JSON
        return c.json({ data: "data not found" }, 404);
        }

	}
});