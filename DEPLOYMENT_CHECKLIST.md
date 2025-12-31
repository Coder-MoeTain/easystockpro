# Laravel Deployment Checklist for Cloud Server

## Common Causes of HTTP 500 Errors on Cloud Server

### 1. **Environment Configuration (.env file)**
- [ ] Ensure `.env` file exists on the server
- [ ] Verify `APP_ENV=production`
- [ ] Verify `APP_DEBUG=false` (should be false in production)
- [ ] Check database credentials are correct
- [ ] Verify `APP_URL` matches your domain (https://kbox.elitepos.pro)
- [ ] Check `APP_KEY` is set (run `php artisan key:generate` if missing)

### 2. **File Permissions**
Run these commands on your cloud server:
```bash
# Storage and cache directories must be writable
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Or if using different user:
chown -R $USER:www-data storage bootstrap/cache
```

### 3. **Composer Dependencies**
```bash
# Install/update dependencies
composer install --no-dev --optimize-autoloader
```

### 4. **Laravel Cache & Config**
```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Rebuild cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. **Storage Link**
```bash
# Create symbolic link for storage
php artisan storage:link
```

### 6. **Database Migration**
```bash
# Run migrations
php artisan migrate --force
```

### 7. **Check Server Logs**
Check these locations for actual error messages:
- Laravel logs: `storage/logs/laravel.log`
- Web server error logs (Apache: `/var/log/apache2/error.log` or Nginx: `/var/log/nginx/error.log`)
- PHP error logs

### 8. **PHP Requirements**
Verify PHP extensions are installed:
```bash
php -m | grep -E "pdo|mbstring|openssl|tokenizer|json|curl|fileinfo|xml|zip"
```

Required extensions:
- PDO
- mbstring
- openssl
- tokenizer
- json
- curl
- fileinfo
- xml
- zip

### 9. **Web Server Configuration**
Ensure your web server (Apache/Nginx) points to the `public` directory:
- Document root should be: `/path/to/your/project/public`
- Not: `/path/to/your/project`

### 10. **Check Actual Error**
Enable temporary debugging to see the actual error:
In `.env` file, temporarily set:
```
APP_DEBUG=true
APP_ENV=local
```
Then refresh the page to see the actual error message. **Remember to set it back to false after debugging!**

### Quick Fix Commands (Run on Server)
```bash
cd /path/to/your/project

# Set permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Install dependencies
composer install --no-dev --optimize-autoloader

# Clear and rebuild cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache

# Create storage link
php artisan storage:link

# Run migrations
php artisan migrate --force
```


