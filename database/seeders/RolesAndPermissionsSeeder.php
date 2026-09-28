<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $admin = Role::create(['name' => 'Admin']);
        $manager = Role::create(['name' => 'Manager']);
        $userRole = Role::create(['name' => 'User']);

        // Create Permissions
        Permission::create(['name' => 'manage products']);
        Permission::create(['name' => 'process sales']);
        Permission::create(['name' => 'view reports']);

        // Assign Permissions
        $admin->givePermissionTo(['manage products', 'process sales', 'view reports']);
        $manager->givePermissionTo(['manage products', 'view reports']);
        $userRole->givePermissionTo(['process sales']);
    }
}
