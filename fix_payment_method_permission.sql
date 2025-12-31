-- Fix Payment Method Permission SQL Script
-- Run this SQL script on your cloud server database
-- This will add the payment_method permission and assign it to admin role

-- Step 1: Check if permission exists, if not add it
INSERT INTO permissions (name, created_at, updated_at)
SELECT 'payment_method', NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM permissions 
    WHERE name = 'payment_method' 
    AND deleted_at IS NULL
);

-- Step 2: Get the permission ID (you may need to adjust this)
SET @permission_id = (SELECT id FROM permissions WHERE name = 'payment_method' AND deleted_at IS NULL LIMIT 1);

-- Step 3: Assign permission to admin role (role_id = 1)
-- Adjust role_id if your admin role has a different ID
INSERT INTO permission_role (permission_id, role_id, created_at, updated_at)
SELECT @permission_id, 1, NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM permission_role 
    WHERE permission_id = @permission_id 
    AND role_id = 1
);

-- Step 4: Verify the assignment
SELECT 
    p.id as permission_id,
    p.name as permission_name,
    r.id as role_id,
    r.name as role_name
FROM permissions p
JOIN permission_role pr ON p.id = pr.permission_id
JOIN roles r ON pr.role_id = r.id
WHERE p.name = 'payment_method'
AND p.deleted_at IS NULL
AND r.deleted_at IS NULL;

-- If you need to assign to a different role, replace '1' with your role ID:
-- INSERT INTO permission_role (permission_id, role_id, created_at, updated_at)
-- SELECT @permission_id, YOUR_ROLE_ID, NOW(), NOW()
-- WHERE NOT EXISTS (
--     SELECT 1 FROM permission_role 
--     WHERE permission_id = @permission_id 
--     AND role_id = YOUR_ROLE_ID
-- );


