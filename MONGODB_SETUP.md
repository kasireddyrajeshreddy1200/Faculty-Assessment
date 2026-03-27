# MongoDB Credentials Update Guide

## Current Status
Your `.env` file currently contains MongoDB credentials in plain text:
```
MONGO_URI=mongodb+srv://admin:rajesh@faculty-assessment-clus.ejxshey.mongodb.net/facultyDB
```

## ⚠️ SECURITY ACTION REQUIRED

### Step 1: Update MongoDB Atlas Password

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Log in** with your account
3. Navigate to **Security** → **Database Access**
4. Find the `admin` user in the list
5. Click the **Edit** button (pencil icon)
6. Click **Edit Password**
7. Choose "Generate Secure Password" (or create a strong one)
8. **Copy the new password** (you'll need it in the next step)
9. Click **Update User**

### Step 2: Get New Connection String

1. In MongoDB Atlas, go to **Databases** → **Connect**
2. Choose **Drivers** (Node.js)
3. Copy the connection string (it will have placeholders like `<password>` and `<username>`)
4. It will look similar to:
   ```
   mongodb+srv://<username>:<password>@faculty-assessment-clus.ejxshey.mongodb.net/facultyDB?retryWrites=true&w=majority
   ```

### Step 3: Update .env File

1. Open `backend/.env` file
2. Replace the `MONGO_URI` line with your new connection string
3. Replace `<username>` and `<password>` with actual values from step 1-2
4. Example:
   ```
   MONGO_URI=mongodb+srv://newusername:NewSecurePassword123@faculty-assessment-clus.ejxshey.mongodb.net/facultyDB?retryWrites=true&w=majority
   ```

### Step 4: Test Connection

1. Stop your server (Ctrl+C in terminal)
2. Run: `npm start`
3. Check for: `"MongoDB connected successfully"` message
4. If you see connection errors, verify the credentials are correct

---

## ✅ Already Completed

Your JWT secret has been updated to a strong cryptographic value:
```
JWT_SECRET=fb093054254ad7a94758c5eacea89902ea2803be40dde0bfece27719801ff0a4
```

---

## 🔒 Additional Security Tips

1. **Keep `.env` secret** - Never commit it to git (already in .gitignore ✓)
2. **Different secrets per environment** - Use different passwords for:
   - Development (current)
   - Staging (if you have it)
   - Production (should have separate MongoDB cluster)
3. **Rotate credentials regularly** - Every 90 days is recommended
4. **Use IP Whitelist in MongoDB** - Restrict access to your server's IP address
