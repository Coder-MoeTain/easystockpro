#!/bin/bash
# Check Web Server Configuration
# This helps identify web server issues

echo "=== Web Server Configuration Check ==="

# Check if Apache is running
if systemctl is-active --quiet apache2; then
    echo "✓ Apache is running"
    echo "Checking Apache error log..."
    tail -20 /var/log/apache2/error.log 2>/dev/null || echo "Cannot access Apache logs"
elif systemctl is-active --quiet httpd; then
    echo "✓ Apache (httpd) is running"
    echo "Checking Apache error log..."
    tail -20 /var/log/httpd/error_log 2>/dev/null || echo "Cannot access Apache logs"
else
    echo "Apache not found"
fi

# Check if Nginx is running
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx is running"
    echo "Checking Nginx error log..."
    tail -20 /var/log/nginx/error.log 2>/dev/null || echo "Cannot access Nginx logs"
else
    echo "Nginx not found"
fi

# Check PHP-FPM status
if systemctl is-active --quiet php*-fpm 2>/dev/null || systemctl is-active --quiet php-fpm 2>/dev/null; then
    echo "✓ PHP-FPM is running"
else
    echo "⚠️  PHP-FPM might not be running"
fi

# Check document root
echo ""
echo "Current directory: $(pwd)"
echo "Public directory exists: $([ -d public ] && echo 'Yes' || echo 'No')"
echo "index.php exists: $([ -f public/index.php ] && echo 'Yes' || echo 'No')"

# Check .htaccess (for Apache)
if [ -f public/.htaccess ]; then
    echo "✓ .htaccess file exists"
else
    echo "⚠️  .htaccess file missing in public directory"
fi

echo ""
echo "=== Check Complete ==="


