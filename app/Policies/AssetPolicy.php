<?php

namespace App\Policies;

use App\Models\Asset;
use App\Models\User;

class AssetPolicy
{
    public function update(User $user, Asset $asset): bool
    {
        return $user->id === $asset->user_id;
    }

    public function delete(User $user, Asset $asset): bool
    {
        return $user->id === $asset->user_id;
    }
}
