#!/bin/bash
# Fix Server Issues Script
# Run this on your cloud server: bash FIX_SERVER_ISSUES.sh

echo "=== Fixing Laravel Server Issues ==="

cd /mnt/volume_sgp1_01/kbox

# 1. Create storage link
echo "1. Creating storage link..."
php artisan storage:link

# 2. Clear all caches
echo "2. Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 3. Rebuild cache for production
echo "3. Rebuilding caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Optimize autoloader
echo "4. Optimizing autoloader..."
composer dump-autoload --optimize

# 5. Check .env file for critical settings
echo "5. Checking .env configuration..."
if grep -q "APP_DEBUG=true" .env; then
    echo "   ⚠️  WARNING: APP_DEBUG is set to true. Should be false in production."
    echo "   Consider changing APP_DEBUG=false in .env file"
fi

if grep -q "APP_ENV=local" .env; then
    echo "   ⚠️  WARNING: APP_ENV is set to local. Should be production."
    echo "   Consider changing APP_ENV=production in .env file"
fi

# 6. Set proper permissions (if needed)
echo "6. Setting permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || chown -R $(whoami):www-data storage bootstrap/cache

# 7. Check if log directory exists and is writable
echo "7. Checking log directory..."
if [ ! -d "storage/logs" ]; then
    mkdir -p storage/logs
    chmod 775 storage/logs
fi
touch storage/logs/laravel.log
chmod 664 storage/logs/laravel.log

# 8. Test database connection
echo "8. Testing database connection..."
php artisan tinker --execute="DB::connection()->getPdo(); echo 'Database connection: OK\n';" 2>&1 | head -1

# 9. Check for syntax errors
echo "9. Checking for syntax errors..."
php -l artisan
php -l bootstrap/app.php

echo ""
echo "=== Fix Complete ==="
echo ""
echo "Next steps:"
echo "1. Check web server error logs:"
echo "   - Apache: tail -f /var/log/apache2/error.log"
echo "   - Nginx: tail -f /var/log/nginx/error.log"
echo ""
echo "2. Check Laravel logs:"
echo "   tail -f storage/logs/laravel.log"
echo ""
echo "3. If still getting 500 error, temporarily enable debug:"
echo "   Edit .env: APP_DEBUG=true"
echo "   Then refresh page to see actual error"
echo "   Remember to set APP_DEBUG=false after fixing!"


