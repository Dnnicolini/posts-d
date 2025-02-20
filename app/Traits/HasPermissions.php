<?php

namespace App\Traits;

use App\Schemas\PermissionSchema;

trait HasPermissions
{
    public function hasPermission(string $permission): bool
    {
        return $this->roles->some(function ($role) use ($permission) {
            return $role->permissions->contains(PermissionSchema::name, $permission);
        });
    }
}