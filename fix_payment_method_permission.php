<?php
/**
 * Fix Payment Method Permission
 * Run this on your cloud server: php fix_payment_method_permission.php
 * This will add the payment_method permission and assign it to admin role
 */

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

echo "=== Fixing Payment Method Permission ===\n\n";

try {
    // Check if permission already exists
    $existingPermission = DB::table('permissions')
        ->where('name', 'payment_method')
        ->whereNull('deleted_at')
        ->first();

    if ($existingPermission) {
        echo "✓ Permission 'payment_method' already exists (ID: {$existingPermission->id})\n";
        $permissionId = $existingPermission->id;
    } else {
        // Add 'payment_method' permission
        echo "Adding 'payment_method' permission...\n";
        $permissionId = DB::table('permissions')->insertGetId([
            'name' => 'payment_method',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        echo "✓ Permission added with ID: {$permissionId}\n";
    }

    // Get admin role (usually role_id = 1)
    $adminRole = DB::table('roles')
        ->where('id', 1)
        ->whereNull('deleted_at')
        ->first();

    if (!$adminRole) {
        // Try to find admin role by name
        $adminRole = DB::table('roles')
            ->where('name', 'like', '%admin%')
            ->whereNull('deleted_at')
            ->first();
    }

    if ($adminRole) {
        echo "\nAdmin role found: {$adminRole->name} (ID: {$adminRole->id})\n";
        
        // Check if permission is already assigned to admin role
        $existingAssignment = DB::table('permission_role')
            ->where('permission_id', $permissionId)
            ->where('role_id', $adminRole->id)
            ->first();

        if ($existingAssignment) {
            echo "✓ Permission already assigned to admin role\n";
        } else {
            // Assign 'payment_method' permission to admin role
            echo "Assigning permission to admin role...\n";
            DB::table('permission_role')->insert([
                'permission_id' => $permissionId,
                'role_id' => $adminRole->id,
            ]);
            echo "✓ Permission assigned to admin role\n";
        }
    } else {
        echo "⚠️  WARNING: Admin role not found. Please manually assign permission to your role.\n";
    }

    // Check all roles and show which ones have the permission
    echo "\n=== Permission Assignment Summary ===\n";
    $roleAssignments = DB::table('permission_role')
        ->join('roles', 'permission_role.role_id', '=', 'roles.id')
        ->where('permission_role.permission_id', $permissionId)
        ->whereNull('roles.deleted_at')
        ->select('roles.id', 'roles.name')
        ->get();

    if ($roleAssignments->count() > 0) {
        echo "Permission 'payment_method' is assigned to:\n";
        foreach ($roleAssignments as $assignment) {
            echo "  - Role ID {$assignment->id}: {$assignment->name}\n";
        }
    } else {
        echo "⚠️  No roles have this permission assigned!\n";
    }

    echo "\n=== Fix Complete ===\n";
    echo "\nNext steps:\n";
    echo "1. Clear Laravel cache: php artisan config:clear\n";
    echo "2. Clear route cache: php artisan route:clear\n";
    echo "3. Log out and log back in to refresh your permissions\n";
    echo "4. Try accessing the payment methods page again\n";

} catch (\Exception $e) {
    echo "✗ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}


