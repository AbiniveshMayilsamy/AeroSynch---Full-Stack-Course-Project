# AeroSynch Deployment Guide

## Backend Deployment on Render

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up

2. **Deploy Backend**:
   - Connect your GitHub repository
   - Select "Web Service"
   - Choose your backend folder: `airline-scm/backend`
   - Render will automatically detect the `render.yaml` file
   - The PostgreSQL database will be created automatically

3. **Get Backend URL**: After deployment, copy your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment on Vercel

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up

2. **Deploy Frontend**:
   - Connect your GitHub repository
   - Select your frontend folder: `airline-scm/frontend`
   - Add environment variable:
     - `REACT_APP_API_URL`: Your Render backend URL + `/api`

3. **Get Frontend URL**: After deployment, copy your frontend URL

## Final Configuration

1. **Update Backend Environment**:
   - In Render dashboard, update `CLIENT_URL` to your Vercel frontend URL

2. **Test the Application**:
   - Visit your Vercel frontend URL
   - Try logging in with:
     - Admin: `admin@airline.com` / `admin123`
     - User: `user@airline.com` / `user123`

## Environment Variables Summary

### Render (Backend)
- `NODE_ENV`: production
- `CLIENT_URL`: https://your-vercel-app.vercel.app
- Database variables are auto-configured

### Vercel (Frontend)
- `REACT_APP_API_URL`: https://your-render-app.onrender.com/api

## Notes
- First deployment may take 5-10 minutes
- Free tier services may sleep after inactivity
- Database persists data between deployments