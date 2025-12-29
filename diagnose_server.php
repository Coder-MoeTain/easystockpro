<?php
/**
 * Server Diagnostic Script
 * Run this on your cloud server to check common issues
 * Usage: php diagnose_server.php
 */

echo "=== Laravel Server Diagnostic ===\n\n";

// Check PHP version
echo "1. PHP Version: " . PHP_VERSION . "\n";
if (version_compare(PHP_VERSION, '7.4.0', '<')) {
    echo "   ⚠️  WARNING: PHP 7.4+ required\n";
} else {
    echo "   ✓ OK\n";
}

// Check required extensions
echo "\n2. Required PHP Extensions:\n";
$required = ['pdo', 'mbstring', 'openssl', 'tokenizer', 'json', 'curl', 'fileinfo', 'xml', 'zip'];
foreach ($required as $ext) {
    if (extension_loaded($ext)) {
        echo "   ✓ $ext\n";
    } else {
        echo "   ✗ $ext - MISSING!\n";
    }
}

// Check .env file
echo "\n3. Environment File:\n";
if (file_exists(__DIR__ . '/.env')) {
    echo "   ✓ .env file exists\n";
    $env = file_get_contents(__DIR__ . '/.env');
    if (strpos($env, 'APP_KEY=') !== false && strpos($env, 'APP_KEY=base64:') !== false) {
        echo "   ✓ APP_KEY is set\n";
    } else {
        echo "   ⚠️  APP_KEY might not be set properly\n";
    }
    if (strpos($env, 'APP_DEBUG=true') !== false) {
        echo "   ⚠️  WARNING: APP_DEBUG is true (should be false in production)\n";
    }
} else {
    echo "   ✗ .env file NOT FOUND!\n";
}

// Check storage permissions
echo "\n4. Storage Permissions:\n";
$storagePath = __DIR__ . '/storage';
$cachePath = __DIR__ . '/bootstrap/cache';

if (is_dir($storagePath)) {
    if (is_writable($storagePath)) {
        echo "   ✓ storage/ is writable\n";
    } else {
        echo "   ✗ storage/ is NOT writable\n";
    }
} else {
    echo "   ✗ storage/ directory NOT FOUND\n";
}

if (is_dir($cachePath)) {
    if (is_writable($cachePath)) {
        echo "   ✓ bootstrap/cache/ is writable\n";
    } else {
        echo "   ✗ bootstrap/cache/ is NOT writable\n";
    }
} else {
    echo "   ✗ bootstrap/cache/ directory NOT FOUND\n";
}

// Check vendor directory
echo "\n5. Dependencies:\n";
if (is_dir(__DIR__ . '/vendor')) {
    echo "   ✓ vendor/ directory exists\n";
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        echo "   ✓ Composer autoload exists\n";
    } else {
        echo "   ✗ Composer autoload NOT FOUND - Run: composer install\n";
    }
} else {
    echo "   ✗ vendor/ directory NOT FOUND - Run: composer install\n";
}

// Check storage link
echo "\n6. Storage Link:\n";
$linkPath = __DIR__ . '/public/storage';
if (is_link($linkPath) || is_dir($linkPath)) {
    echo "   ✓ storage link exists\n";
} else {
    echo "   ⚠️  storage link might be missing - Run: php artisan storage:link\n";
}

// Check database connection
echo "\n7. Database Connection:\n";
if (file_exists(__DIR__ . '/.env')) {
    $env = file_get_contents(__DIR__ . '/.env');
    if (preg_match('/DB_CONNECTION=(.+)/', $env, $matches)) {
        $dbConnection = trim($matches[1]);
        echo "   Database: $dbConnection\n";
        
        if (preg_match('/DB_HOST=(.+)/', $env, $matches)) {
            $dbHost = trim($matches[1]);
            echo "   Host: $dbHost\n";
        }
    }
}

// Check recent log errors
echo "\n8. Recent Errors (last 10 lines from laravel.log):\n";
$logFile = __DIR__ . '/storage/logs/laravel.log';
if (file_exists($logFile)) {
    $lines = file($logFile);
    $recent = array_slice($lines, -10);
    foreach ($recent as $line) {
        if (stripos($line, 'error') !== false || stripos($line, 'exception') !== false) {
            echo "   " . trim($line) . "\n";
        }
    }
} else {
    echo "   No log file found\n";
}

echo "\n=== Diagnostic Complete ===\n";
echo "\nIf issues found, check DEPLOYMENT_CHECKLIST.md for solutions.\n";

